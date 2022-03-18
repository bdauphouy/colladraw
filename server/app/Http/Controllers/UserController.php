<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Drawing;
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
        $drawings = [];

        foreach (json_decode($user->drawings) as $drawing_id) {
            $drawing = Drawing::where('uuid', '=', $drawing_id)->first();


            array_push($drawings, $drawing->getAttributes());
        }

        return view('profile', [
          'user' => $user,
          'user_drawings' => $drawings,
          'title' => 'Profile',
          'css' => 'profile'
        ]);
    }
}