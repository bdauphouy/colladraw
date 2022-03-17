<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Drawing;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class DrawingController extends Controller
{
    public function index() 
    {
        return Drawing::all();
    }

    public function search($id) 
    {
        $drawing = Drawing::where('uuid', '=', $id)->first();
        
        return view('drawing', [
            'title' => 'Drawing',
            'css' => 'drawing',
            'drawing' => $drawing
        ]);

    }

    public function user($id) 
    {
        return Drawing::where('creator', '=', $id)->get();
    }

    public function create(Request $request) 
    {
        $uuid = Str::orderedUuid()->toString(); 
        
        $drawing;

        if (Auth::user()) {
            $drawing = Drawing::create([
                'uuid' => $uuid,
                'creator' => Auth::user()->id,
                'members' => json_encode([
                    Auth::user(),
                ]),
                'history' => json_encode([]),
            ]);
        } else {
            $creator = json_decode($request->getContent())->name;
            
            $drawing = Drawing::create([
                'uuid' => $uuid,
                'creator' => $creator,
                'members' => json_encode([
                    $creator,
                ]),
                'history' => json_encode([]),
            ]);
        }

        
        $response = [
            'drawing' => $drawing,
        ];

        return response($response, 201);
    }
}