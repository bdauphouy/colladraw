<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index() 
    {
        return User::all();
    }

    public function search($id) 
    {
        return User::where('id', '=', $id)->first();
    }
}