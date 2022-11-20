<?php

namespace App\Http\Controllers;

use App\Actions\CreateOrderAction;
use App\Models\Event;
use App\Models\Order;
use App\Models\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use SebastianBergmann\Type\NullType;

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

        $data = [
            'id' => null,
            'route_id' => $request->route_id,
            'additional_route_id' => $request->additional_route_id,
            'group' => $request->group,
            'preferential' => $request->preferential
        ];
        $adult_count = $request->ticket_adult_quanity;
        $kid_count = $request->ticket_kid_quanity;
        $route_id = $request->route_id;
        $firtTime = Route::find($route_id)->time;
        $additional_route_id = $request->additional_route_id;
        $additional_route_id ? $secondTime = Route::find($additional_route_id)->time : $secondTime = false;

        if ($secondTime) {
            if ($firtTime >= $secondTime) {
                return response('Время отплытия не может быть больше или быть равным времени обратного направления', 404);
            }
        }

        $order = CreateOrderAction::handle($data, $adult_count, $kid_count);
        return response('Вы успешно оформили билеты', 200);
    }
}
