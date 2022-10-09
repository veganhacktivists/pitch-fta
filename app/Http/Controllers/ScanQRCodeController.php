<?php

namespace App\Http\Controllers;

use App\Models\BadgeTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ScanQRCodeController extends Controller
{
    public function __invoke(Request $request, BadgeTask $badgeTask)
    {
        if ($request->isMethod('GET')) {
            return Inertia::render('ScanQRCode');
        }

        $user = Auth::user();
        $hasBadgeTask = $user
            ->badgeTasks()
            ->where('badge_task_id', $badgeTask->id)
            ->exists();

        if (!$hasBadgeTask) {
            $badgeTask->loadMissing('badge', 'badge.tasks');

            $user->badgeTasks()->attach($badgeTask->id);

            $numBadgeTasks = $badgeTask->badge->tasks->count();
            $numCompleteTasks = $user->badgeTasks()->count();
            $didCompleteAllBadgeTasks = $numCompleteTasks === $numBadgeTasks;
            session()->flash('badge_task', $badgeTask);

            if ($didCompleteAllBadgeTasks) {
                $user->badges()->attach($badgeTask->badge->id);

                session()->flash('badge', $badgeTask->badge);
            } else {
                session()->flash('progress', $numCompleteTasks);
            }
        } else {
            session()->flash(
                'message',
                "You've already scanned this QR code. Try another one!"
            );
        }

        return redirect()->back();
    }
}
