<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Badge;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    const NUM_VOTES_FOR_REFERRAL = 10;

    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'string', 'digits:4'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if ($referralCode = $request->input('referrer')) {
            $referrer = User::where('referral_code', $referralCode)->first();

            if ($referrer) {
                $referrer->awardVotes(self::NUM_VOTES_FOR_REFERRAL);

                $recruiterBadge = Badge::where(
                    'title',
                    'The Recruiter'
                )->first();

                if ($recruiterBadge && !$referrer->hasBadge($recruiterBadge)) {
                    $referrer->badges()->attach($recruiterBadge->id);
                }

                $user->referrer_id = $referrer->id;
                $user->save();
            }
        }

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
