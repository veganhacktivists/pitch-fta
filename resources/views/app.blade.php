@php
    use Detection\MobileDetect;
    $detect = new MobileDetect();
    $isMobile = $detect->isMobile();
    $isIosChrome = $detect->isIOS() && $detect->isChrome();
@endphp
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

        <link rel="manifest" href="/manifest.json">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
        <script>
            WebFont.load({ google: { families: ['Press Start 2P'] } });
        </script>

        @routes
        @viteReactRefresh
        @vite('resources/js/app.tsx')
        @inertiaHead
    </head>
    <body class="font-sans text-xs bg-stone-700">
        @if (!$isMobile)
            <div class="mx-auto relative flex h-screen overflow-hidden max-w-lg" id="app-container">
                @inertia
            </div>
        @else
                @inertia
        @endif

        <script>
            // Register Service worker for Add to Home Screen option to work
            if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/service-worker.js') }

            @if ($isIosChrome)
                window.isIOS = true
                window.isChrome = true
            @endif
        </script>
    </body>
</html>
