<?php

namespace App\Http\Controllers;

use App\Models\TriviaAnswer;
use App\Models\TriviaQuestion;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TriviaController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = Auth::user();

        if ($request->isMethod('GET')) {
            return Inertia::render('Trivia/Question', [
                'question' => TriviaQuestion::with('answers')
                    ->whereNotAnsweredBy($user)
                    ->inRandomOrder()
                    ->first(),
            ]);
        }

        $request->validate([
            'answer_id' => ['required', 'exists:trivia_answers,id'],
        ]);

        $answer = TriviaAnswer::find($request->input('answer_id'));
        if ($answer->is_correct) {
            User::where('id', $user->id)->increment('num_votes');

            session()->flash('message', "Correct! You've earned a new vote.");
        } else {
            session()->flash('message', 'Oh no! Your answer was incorrect.');
        }

        $user->answeredQuestions()->create([
            'trivia_question_id' => $answer->trivia_question_id,
            'trivia_answer_id' => $answer->id,
        ]);

        return redirect()->back();
    }
}
