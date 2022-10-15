<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
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
    <body class="font-sans text-xs street">
        <div id="app-container">
            @inertia
        </div>

        <script>
            if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/service-worker.js') }
        </script>
    </body>
</html>
