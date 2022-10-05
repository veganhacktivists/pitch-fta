<?php

namespace App\Http\Controllers;

use App\Models\Doodle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;

class DoodleController extends Controller
{
    const NUM_VOTES_ON_FIRST_DOODLE = 3;

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
        if ($user->doodles()->count() === 1) {
            $user->awardVotes(self::NUM_VOTES_ON_FIRST_DOODLE);
            session()->flash(
                'message',
                'Thanks for submitting a doodle! You earned three more votes.'
            );
        }

        return redirect()->route('doodles.show', $doodle->id);
    }

    public function show(Doodle $doodle)
    {
        return Inertia::render('Doodles/Show', ['doodle' => $doodle]);
    }
}
