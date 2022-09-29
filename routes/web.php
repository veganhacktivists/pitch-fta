<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\IdeasController;
use App\Http\Controllers\RouteUserBasedOnEmailController;
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
    Route::resource('/ideas', IdeasController::class)->only([
        'index',
        'create',
        'store',
    ]);
});

require __DIR__ . '/auth.php';
