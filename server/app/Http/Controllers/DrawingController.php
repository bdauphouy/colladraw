<?php

namespace App\Http\Controllers;

use Dompdf\Dompdf;
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

    public function search(Request $request, $id)
    {
        $drawing = Drawing::where('uuid', '=', $id)->first();

        if (!$drawing) {
            return view('404', ['type' => 'drawing']);
        }

        $drawing_members_array = json_decode($drawing->members);

        if (Auth::user()) {
            $user = User::where('id', '=', Auth::user()->id)->first();

            if (!in_array($user->name, $drawing_members_array)) {


                array_push($drawing_members_array, $user->name);

                $user_drawings = json_decode($user->drawings);
                array_push($user_drawings, $drawing->uuid);

                $user->drawings = json_encode($user_drawings);
                $user->save();


            }
        } else {
            $name;

            if (array_key_exists("name", $request->query())) {
                $name = $request->query()['name'];
            } else {
                return redirect("/?ask=true&session=$drawing->uuid");
            }



            if (!in_array($name, $drawing_members_array)) {
                array_push($drawing_members_array, $name);
            }
        }

        $drawing->members = json_encode($drawing_members_array);
        $drawing->save();

        return view('drawing', [
            'drawing' => $drawing,
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
            $user = User::where('id', '=', Auth::user()->id)->first();

            $drawing = Drawing::create([
                'uuid' => $uuid,
                'creator' => $user->id,
                'members' => json_encode([
                    $user->name,
                ]),
                'history' => json_encode([]),
            ]);

            $user_drawings_array = json_decode($user->drawings);
            array_push($user_drawings_array, $drawing->uuid);
            $user->drawings = json_encode($user_drawings_array);
            $user->save();
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

    public function export(Request $request)
    {
        $drawing_image = json_decode($request->getContent())->image;
        $format = $request->query()['format'];

        $drawing_image = str_replace('data:image/png;base64,', '', $drawing_image);
        $drawing_image = str_replace(' ', '+', $drawing_image);
        $file = 'drawing.png';

        if ($format == 'pdf') {
            $file = str_replace('.png', '.pdf', $file);
            $dompdf = new Dompdf();
            $width = imagesx(imagecreatefromstring(base64_decode($drawing_image)));
            $height = imagesy(imagecreatefromstring(base64_decode($drawing_image)));
            $dompdf->setPaper([0, 0, $width, $height], 'portrait');
            $dompdf->loadHtml('<html style="margin: 0; height: 100%; width: 100%;"><body style="margin: 0; height: 100%; width: 100%;"><img style="height: 100%; width: 100%;" src="data:image/png;base64,' . $drawing_image . '" /></body></html>');
            $dompdf->render();
            $dompdf->stream($file);
        }

        return response()->download($file);
    }
}
