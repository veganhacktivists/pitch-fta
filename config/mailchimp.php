<?php

return [
    'api' => [
        'key' => env('MAILCHIMP_API_KEY'),
        'server_prefix' => env('MAILCHIMP_SERVER_PREFIX'),
    ],
    'audience' => [
        'id' => env('MAILCHIMP_AUDIENCE_ID'),
        'tag' => env('MAILCHIMP_AUDIENCE_TAG'),
    ],
];
