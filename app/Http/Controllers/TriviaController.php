<?php

namespace App\Http\Controllers;

use App\Models\Badge;
use App\Models\TriviaAnswer;
use App\Models\TriviaAnsweredQuestion;
use App\Models\TriviaQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TriviaController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = Auth::user();

        if ($request->isMethod('GET')) {
            $props = session('props', [
                'question' => TriviaQuestion::with('answers')
                    ->whereNotAnsweredBy($user)
                    ->inRandomOrder()
                    ->first(),
            ]);

            return Inertia::render('Trivia/Question', $props);
        }

        $request->validate([
            'answer_id' => ['required', 'exists:trivia_answers,id'],
        ]);

        $answer = TriviaAnswer::find($request->input('answer_id'));
        if ($answer->is_correct) {
            $user->awardVotes(1);

            session()->flash('message', "Correct! You've earned 1 vote.");
        } else {
            session()->flash('message', 'Oh no! Your answer was incorrect.');

            $question = $answer
                ->question()
                ->with('answers')
                ->first();

            $correctAnswer = $question->answers
                ->where('is_correct', true)
                ->first();

            session()->flash('props', [
                'question' => $question,
                'correctAnswer' => $correctAnswer,
                'chosenAnswer' => $answer,
            ]);
        }

        $user->answeredQuestions()->create([
            'trivia_question_id' => $answer->trivia_question_id,
            'trivia_answer_id' => $answer->id,
        ]);

        $hasAnsweredAllQuestions =
            $user->answeredQuestions()->count() === TriviaQuestion::count();
        if ($hasAnsweredAllQuestions) {
            $goGetterBadge = Badge::where('title', 'The Go-Getter')->first();
            if ($goGetterBadge && !$user->hasBadge($goGetterBadge)) {
                $user->badges()->attach($goGetterBadge->id);
                $user->awardVotes($goGetterBadge->num_votes);
                session()->flash('badge', $goGetterBadge);

                $answeredQuestions = $user
                    ->answeredQuestions()
                    ->with('answer')
                    ->get();

                $hasIncorrectAnswers = (bool) Arr::first(
                    $answeredQuestions,
                    fn(TriviaAnsweredQuestion $q) => !$q->answer->is_correct
                );

                if (!$hasIncorrectAnswers) {
                    $oracleBadge = Badge::where('title', 'The Oracle')->first();

                    if ($oracleBadge) {
                        $user->badges()->attach($oracleBadge->id);
                        $user->awardVotes($oracleBadge->num_votes);
                        session()->flash('badge', $oracleBadge);
                    }
                }
            }
        }

        return redirect()->back();
    }
}
