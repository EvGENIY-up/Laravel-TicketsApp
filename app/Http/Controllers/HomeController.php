<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class HomeController extends Controller
{

    /**
     * Get the events application.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $props = Event::with('routes')->get()->toArray();
        return view('home', compact('props'));
    }

    /**
     * Store a new order and his tickets.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $request->validate([
            'route_id' => 'required|integer|exists:routes,id',
            'additional_route_id' => 'nullable|integer|exists:routes,id',
            'ticket_adult_quanity' => 'required|integer|max_digits:20',
            'ticket_kid_quanity' => 'nullable|integer|max_digits:20',
            'group' => 'required|integer|max_digits:1',
            'preferential' => 'required|integer|max_digits:1',
        ]);


        $order = new Order();
    }
}
