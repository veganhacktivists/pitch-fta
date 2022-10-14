<?php

namespace App\Http\Controllers;

use App\Models\BadgeTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ScanQRCodeController extends Controller
{
    public function __invoke(Request $request, BadgeTask $badgeTask = null)
    {
        if ($request->isMethod('GET') && !$badgeTask) {
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
            $user->awardVotes($badgeTask->num_votes);

            $numBadgeTasks = $badgeTask->badge->tasks->count();
            $numCompletedTasks = $user
                ->badgeTasks()
                ->whereIn(
                    'badge_tasks.id',
                    $badgeTask->badge->tasks->pluck('id')
                )
                ->count();
            $didCompleteAllBadgeTasks = $numCompletedTasks === $numBadgeTasks;

            session()->flash('badge_task', $badgeTask);

            if ($didCompleteAllBadgeTasks) {
                $user->badges()->attach($badgeTask->badge->id);
                $user->awardVotes($badgeTask->badge->num_votes);

                session()->flash('badge', $badgeTask->badge);
            } else {
                session()->flash('progress', $numCompletedTasks);
            }
        } else {
            session()->flash(
                'message',
                "You've already scanned this QR code. Try another one!"
            );
        }

        if ($request->isMethod('POST')) {
            return redirect()->back();
        } else {
            return redirect()->route('scan');
        }
    }
}
