<?php

namespace App\Http\Controllers;

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

        return Inertia::render('Home/Home');
    }
}
