<?php

namespace App\Http\Controllers;

use App\Models\Idea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class IdeasController extends Controller
{
    public function index()
    {
        return Inertia::render('Ideas/Index', [
            'ideas' => Idea::orderByVotes()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Ideas/Index', [
            'ideas' => Idea::orderByVotes()->get(),
            'isCreateModalOpen' => true,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'text' => ['required', 'min:1', 'max:256'],
        ]);

        Auth::user()
            ->ideas()
            ->create([
                'text' => $request->input('text'),
            ]);

        return redirect()
            ->route('ideas.index')
            ->with('message', 'Your idea has been submitted!');
    }

    public function vote(Request $request, Idea $idea)
    {
        Auth::user()->castVote($idea);

        return redirect()->back();
    }
}
