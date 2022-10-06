<?php

namespace App\Http\Controllers;

use App\Models\Idea;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class IdeaController extends Controller
{
    public function index()
    {
        return Inertia::render('Ideas/Index', [
            'ideas' => $this->getIdeas(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Ideas/Index', [
            'ideas' => $this->getIdeas(),
            'isCreateModalOpen' => true,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'text' => ['required', 'min:1', 'max:256'],
        ]);

        $user = Auth::user();

        if ($user->num_votes <= 0) {
            return redirect()
                ->route('ideas.index')
                ->with('message', 'You need more votes to submit an idea!');
        }

        $idea = $user->ideas()->create([
            'text' => $request->input('text'),
        ]);

        $user->castVote($idea);

        return redirect()
            ->route('ideas.index')
            ->with('message', 'Your idea has been submitted!');
    }

    public function vote(Request $request, Idea $idea)
    {
        $user = Auth::user();

        $request->validate([
            'num_votes' => [
                'required',
                'integer',
                'min:1',
                "max:{$user->num_votes}",
            ],
        ]);

        Auth::user()->castVote($idea, $request->input('num_votes'));

        return redirect()->back();
    }

    private function getIdeas(): Collection
    {
        return Idea::orderByVotes()
            ->withCount([
                'votes' => function (Builder $query) {
                    return $query->where('votes.user_id', Auth::id());
                },
            ])
            ->get();
    }
}
