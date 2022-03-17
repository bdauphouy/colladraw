<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index() 
    {
        return User::all();
    }

    public function search(Request $request) 
    { 
        $user = User::where('id', '=', Auth::user()->id)->first();
        return view('profile', [
          'user' => $user
        ]);
    }
}