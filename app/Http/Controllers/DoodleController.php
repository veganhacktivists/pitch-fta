<?php

namespace App\Http\Controllers;

use App\Models\Badge;
use App\Models\Doodle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;

class DoodleController extends Controller
{
    public function index()
    {
        return Inertia::render('Doodles/Index', [
            'doodles' => Doodle::orderBy('created_at', 'DESC')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Doodles/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'doodle' => ['required', File::image()],
        ]);

        $user = Auth::user();

        $doodle = $user->doodles()->create([
            'path' => $request->file('doodle')->store('img'),
        ]);

        // First doodle
        $artistBadge = Badge::where('title', 'The Artist')->first();
        if ($artistBadge && !$user->hasBadge($artistBadge)) {
            $user->awardVotes($artistBadge->num_votes);
            $user->badges()->attach($artistBadge->id);

            session()->flash('badge', $artistBadge);
        }

        return redirect()->route('doodles.show', $doodle->id);
    }

    public function show(Doodle $doodle)
    {
        return Inertia::render('Doodles/Show', ['doodle' => $doodle]);
    }
}
