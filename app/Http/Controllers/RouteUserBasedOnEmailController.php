<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class RouteUserBasedOnEmailController extends Controller
{
    public function __invoke(Request $request)
    {
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
