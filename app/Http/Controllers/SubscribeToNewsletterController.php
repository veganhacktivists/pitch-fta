<?php

namespace App\Http\Controllers;

use App\Actions\Newsletter\SubscribeUser;
use App\Exceptions\Newsletter\NewsletterException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubscribeToNewsletterController extends Controller
{
    public function __invoke(Request $request)
    {
        try {
            app(SubscribeUser::class)(Auth::user());
        } catch (NewsletterException $e) {
            // Ignore, already logged in SubscribeUser
        }

        return redirect()->back();
    }
}
