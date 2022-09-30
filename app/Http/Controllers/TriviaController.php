<?php

namespace App\Http\Controllers;

use App\Models\TriviaQuestion;
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
    }
}
