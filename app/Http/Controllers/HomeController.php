<?php

namespace App\Http\Controllers;

use App\Models\Badge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke(Request $request)
    {
        if (!Auth::user()) {
            return Inertia::render('Welcome');
        }

        Auth::user()->loadMissing('badges', 'badgeTasks');

        return Inertia::render('Home/Home', [
            'badges' => Badge::with('tasks')->get(),
        ]);
    }
}
