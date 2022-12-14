<?php

use App\Http\Controllers\DoodleController;
use App\Http\Controllers\EarnVotesController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\IdeaController;
use App\Http\Controllers\RouteUserBasedOnEmailController;
use App\Http\Controllers\ScanQRCodeController;
use App\Http\Controllers\SubscribeToNewsletterController;
use App\Http\Controllers\TriviaController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', HomeController::class)->name('home');

Route::get('/continue', RouteUserBasedOnEmailController::class)->name(
    'route_based_on_email.show'
);
Route::post('/continue', RouteUserBasedOnEmailController::class)->name(
    'route_based_on_email'
);

Route::middleware(['auth'])->group(function () {
    Route::resource('/ideas', IdeaController::class)->only([
        'index',
        'create',
        'store',
    ]);

    Route::post('/ideas/{idea}/vote', [IdeaController::class, 'vote'])->name(
        'ideas.vote'
    );

    Route::resource('/doodles', DoodleController::class)->only([
        'index',
        'create',
        'store',
        'show',
    ]);

    Route::get('/trivia', TriviaController::class)->name('trivia.question');
    Route::post('/trivia', TriviaController::class)->name('trivia.answer');

    Route::post('/subscribe', SubscribeToNewsletterController::class)->name(
        'newsletter.subscribe'
    );

    Route::get('/scan', ScanQRCodeController::class)->name('scan');
    Route::match(
        ['GET', 'POST'],
        '/scan/{badge_task:permalink}',
        ScanQRCodeController::class
    )->name('scan.submit');
});

require __DIR__ . '/auth.php';
