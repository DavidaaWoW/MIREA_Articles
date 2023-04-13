<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function addSingleArticle(Request $request)
    {
        if (!$request->file('article')) {
            return abort(500);
        }
        $article_data = $request->validate([
            'title' => 'required',
            'indexability' => 'required',
            'udc' => 'required',
            'scientific_adviser' => '',
            'publication_place' => 'required'
        ]);

//        $request->validate([
//            'article' => ['required', 'mimes:docx']
//        ]);


        $article = new Article($article_data);
        $article->id = uniqid();
        $article->file_dir = $request->file('article')[0]->store('/public/' . date("Y") . '/' . date("m"));
        $article->verification_status = "on review";
        $article->user_id = Auth::user()->id;
        $article->save();
    }

    public function getSingleArticle(Request $request, $id)
    {
        if(!$id){
            abort(500);
        }

        $article = Article::where('articles.id', '=', $id)->select('articles.*', 'users.name')->join('users', 'users.id', '=', 'articles.user_id')->first();
        return Inertia::render('SingleArticle', ["article" => $article]);

    }

    public function getArticleByProfileId()
    {
        return Inertia::render('Profile/MyArticles', ["articles" => Article::where(['user_id' => Auth::user()->id])->orderBy('updated_at')->get()]);
    }

    public function getArticlesByUDC($udc)
    {
        if(!$udc){
            abort(500);
        }
        $articles = Article::where('articles.udc', '=', $udc)->select('articles.*', 'users.name')->join('users', 'users.id', '=', 'articles.user_id')->orderBy('updated_at')->get();
        return Inertia::render('Search', ["articles" => $articles, "info" => "Статьи по указанному УДК"]);
    }

    public function searchArticle(Request $request)
    {
        $query = $request->search;
        $articles_array = Article::where('title', 'like', '%' . $query . '%')->select('articles.*', 'users.name')->join('users', 'users.id', '=', 'articles.user_id')->orderBy('articles.updated_at')->get();
        $articles_array = $articles_array->merge(Article::query()->select('articles.*', 'users.name')->join('users', 'users.id', '=', 'articles.user_id')->where('users.name', 'like', '%' . $query . '%')->orderBy('articles.updated_at')->get());
        $articles_array = $articles_array->merge(Article::where('udc', 'like', '%' . $query . '%')->select('articles.*', 'users.name')->join('users', 'users.id', '=', 'articles.user_id')->orderBy('articles.updated_at')->get());
        return Inertia::render('Search', ["articles" => $articles_array]);
    }
    public function downloadFile(Request $request, $id)
    {
        $article = Article::find($id);
        if (!$article) {
            abort(500);
        }
        return Storage::download($article->file_dir, $article->title . '.docx');

    }
}
