<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Drawing;
use App\Models\User;
use Illuminate\Support\Str;

class DrawingController extends Controller
{
    public function index() 
    {
        return Drawing::all();
    }

    public function search($id) 
    {
        return Drawing::where('uuid', '=', $id)->first();
    }

    public function user($id) 
    {
        return Drawing::where('owner', '=', $id)->get();
    }

    public function create(Request $request, $id) 
    {

        $uuid = Str::orderedUuid()->toString(); 
     
        $drawing = Drawing::create([
            'uuid' => $uuid,
            'owner' => $id,
            'members' => json_encode([
                User::where('id', '=', $id)->first(),
            ]),
            'canvas' => json_encode([]),
        ]);
    
        $response = [
            'drawing' => $drawing,
        ];

        return response($response, 201);
    }
}