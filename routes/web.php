<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'profile_info'])->name('dashboard');

Route::get('/search',  function () {
    return Inertia::render('Search');
})->name('searchArticles');

Route::get('/single_article/{id}', [ArticleController::class, 'getSingleArticle'])->name('singleArticle');
Route::get('/another_profile/{id}', [ProfileController::class, 'getAnotherProfileInfo'])->name('anotherProfile');
Route::get('/articles/{udc}', [ArticleController::class, 'getArticlesByUDC'])->name('getArticlesByUDC');
Route::get('/download/{id}', [ArticleController::class, 'downloadFile'])->name('download');


Route::post('/search',  [ArticleController::class, 'searchArticle'])->name('searchArticles');

Route::middleware(['auth', 'profile_info'])->group(function (){
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', ['can' => Auth::user()->can('admin')]);
    })->name('dashboard');
    Route::get('/add_article', function () {
        return Inertia::render('AddArticle');
    })->name('addArticle');
    Route::get('/add_feedback', function () {
        return Inertia::render('AddFeedback');
    })->name('addFeedback');
    Route::get('/profile/my_articles', [ArticleController::class, 'getArticleByProfileId'])->name('myArticles');

    Route::post('/add_article', [ArticleController::class, 'addSingleArticle'])->name('addArticle');
    Route::post('/add_feedback', [FeedbackController::class, 'addFeedback'])->name('addFeedback');
});

Route::middleware(['auth', 'is_admin'])->group(function () {
    Route::get('/admin_panel', function (){
        return Inertia::render('Profile/AdminPanel');
    })->name('adminPanel');

    Route::get('/articles_on_review', [ArticleController::class, 'getArticlesOnReview'])->name('articlesOnReview');
    Route::get('/feedback_list', [FeedbackController::class, 'getFeedback'])->name('feedbackList');
    Route::get('/add_article_zip', function (){
        return Inertia::render('AddArticleZIP');
    })->name('addArticleZIP');

    Route::post('/change_article_status', [ArticleController::class, 'changeArticleStatus'])->name('changeArticleStatus');
    Route::post('/add_article_zip', [ArticleController::class, 'addArticleZIP'])->name('addArticleZIP');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/personal_information', function () {
        return Inertia::render('Profile/PersonalInfo');
    })->name('fillInfo');

    Route::post('/personal_information', [ProfileController::class, 'fillInfo'])->name('fillInfo');
});

require __DIR__.'/auth.php';
