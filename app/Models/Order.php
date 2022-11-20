<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function route()
    {
        return $this->belongsTo(Route::class);
    }

    public function additional_route()
    {
        return $this->belongsTo(Route::class, 'additional_route_id');
    }


    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }
}
