<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RouteUserBasedOnEmailController extends Controller
{
    public function __invoke(Request $request)
    {
        if ($request->isMethod('GET')) {
            return Inertia::render('RouteUserBasedOnEmail');
        }

        $this->validate($request, [
            'email' => 'email',
        ]);

        $email = $request->input('email');

        return redirect()->route(
            User::hasAccount($email) ? 'login' : 'register',
            ['email' => $email]
        );
    }
}
