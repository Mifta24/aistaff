<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\SiteController;
use App\Http\Middleware\SetLocale;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [SiteController::class, 'root']);

Route::prefix('{locale}')->where(['locale' => 'id|en'])->middleware(SetLocale::class)->group(function () {
    Route::get('/', [SiteController::class, 'home'])->name('home');
    Route::get('/agents', [SiteController::class, 'agents'])->name('agents.index');
    Route::get('/agents/{slug}', [SiteController::class, 'show'])->name('agents.show');
    Route::post('/agents/{slug}/chat', [ChatController::class, 'stream'])
        ->middleware('throttle:chat')->name('agents.chat');
});

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
