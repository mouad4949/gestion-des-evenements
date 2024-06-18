<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});
Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});
require __DIR__.'/auth.php';
