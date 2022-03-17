<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DrawingController;

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

Auth::routes();

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/profile', [UserController::class, 'search'])->middleware('auth');

Route::post('/drawings', [DrawingController::class, 'create']);
Route::get('/drawings/{id}', [DrawingController::class, 'search']);
// Route::get('/drawings/{id}', [DrawingController::class, 'search']);
// Route::get('/drawings', [DrawingController::class, 'user']);
// Route::post('/drawings', [DrawingController::class, 'create']);