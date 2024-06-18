<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EvenementController;
use App\Http\Controllers\PanierController;
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/login', [AuthController::class, 'login']);
Route::middleware('guest')->post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::get('/evenements', [EvenementController::class, 'index']);
Route::get('/panier', [PanierController::class, 'index']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/panier', [PanierController::class, 'store']);
// Route::delete('/api/panier/{id}', [PanierController::class, 'destroy']);
