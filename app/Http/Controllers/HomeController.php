<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class HomeController extends Controller
{

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $props = Event::with('routes')->get()->toArray();
        return view('home', compact('props'));
    }

    public function store()
    {
        $data = request()->validate([
            'route_id' => 'integer|exists:route,id',
            'additional_route_id' => 'integer|exists:route,id',
            'group' => 'integer',
            'preferential' => 'integer',
            'ticket_adult_quanity' => 'required|integer|max:2',
            'ticket_kid_quanity' => 'integer|max:2'
        ]);

        dd($data);
    }
}
