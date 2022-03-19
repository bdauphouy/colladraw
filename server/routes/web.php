<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DrawingController;
use App\Http\Controllers\NotFoundController;

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

// Auth router
Auth::routes();

// Home page
Route::get('/', [HomeController::class, 'index'])->name('home');

// Profile page
Route::get('/profile', [UserController::class, 'search'])->middleware('auth');

// Drawing pages
Route::post('/drawings', [DrawingController::class, 'create']);
Route::get('/drawings/{id}', [DrawingController::class, 'search']);

// 404 page
Route::get('/{path}', [NotFoundController::class, 'index']);