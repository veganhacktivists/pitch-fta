<?php

use App\Http\Controllers\DoodleController;
use App\Http\Controllers\EarnVotesController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\IdeaController;
use App\Http\Controllers\RouteUserBasedOnEmailController;
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

Route::post('/', RouteUserBasedOnEmailController::class)->name(
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

    Route::get('/earn', EarnVotesController::class)->name('earn');

    Route::get('/trivia', TriviaController::class)->name('trivia.question');
    Route::post('/trivia', TriviaController::class)->name('trivia.answer');
});

require __DIR__ . '/auth.php';
