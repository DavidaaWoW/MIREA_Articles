<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FeedbackController extends Controller
{
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
    }
}
