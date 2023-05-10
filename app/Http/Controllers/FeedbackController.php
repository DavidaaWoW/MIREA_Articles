<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

/**
 * Класс, отвечающий за взаимодействие с обратной связью
 */
class FeedbackController extends Controller
{

    /**
     * Отвечает за добавление обратной связи
     * @param Request $request
     * @return void
     */
    public function addFeedback(Request $request)
    {
        $feedback_data = $request->validate([
            'message' => 'required'
        ]);

        $feedback = new Feedback();
        $feedback->message = $request->message;
        $feedback->id = uniqid();
        $feedback->user_id = Auth::user()->id;
//        dd($feedback);
        $feedback->save();
        return redirect(route('dashboard'));
    }

    /**
     * Отвечает за получение обратной связи
     * @return \Inertia\Response
     */
    public function getFeedback()
    {
        $user = Auth::user();
        if(!$user->can('admin')){
            abort(404);
        }

        $feedback = Feedback::where('feedback.id', '<>', 'null')->join('users', 'feedback.user_id', '=', 'users.id')->orderBy('feedback.updated_at')->get();
        return Inertia::render('FeedbackList', ['feedback' => $feedback]);
    }
}
