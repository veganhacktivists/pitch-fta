<?php

namespace App\Actions\Newsletter;

use App\Exceptions\Newsletter\NewsletterException;
use App\Models\Badge;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use MailchimpMarketing\ApiClient;
use MailchimpMarketing\ApiException;

class SubscribeUser
{
    public function __invoke(User $user, ApiClient $apiClient = null)
    {
        $apiClient = $apiClient ?? new ApiClient();

        $apiClient->setConfig([
            'apiKey' => config('mailchimp.api.key'),
            'server' => config('mailchimp.api.server_prefix'),
        ]);

        try {
            $apiClient->lists->setListMember(
                config('mailchimp.audience.id'),
                md5(strtolower($user->email)),
                [
                    'email_address' => $user->email,
                    'status_if_new' => 'subscribed',
                    'status' => 'subscribed',
                ]
            );
        } catch (ApiException $e) {
            $errorMessage = $e->getMessage();

            Log::error("Mailchimp API error (subscribing): $errorMessage", [
                'user_id' => $user->id,
            ]);

            throw new NewsletterException($errorMessage);
        }

        try {
            $apiClient->lists->updateListMemberTags(
                config('mailchimp.audience.id'),
                md5(strtolower($user->email)),
                [
                    'tags' => [
                        [
                            'name' => config('mailchimp.audience.tag'),
                            'status' => 'active',
                        ],
                    ],
                ]
            );
        } catch (ApiException $e) {
            $errorMessage = $e->getMessage();

            Log::error("Mailchimp API error (tagging): $errorMessage", [
                'user_id' => $user->id,
            ]);
        }

        $subscriberBadge = Badge::where('title', 'The Subscriber')->first();
        if ($subscriberBadge && !$user->hasBadge($subscriberBadge)) {
            $user->awardVotes($subscriberBadge->num_votes);
            $user->badges()->attach($subscriberBadge->id);

            session()->flash('badge', $subscriberBadge);
        }
    }
}
