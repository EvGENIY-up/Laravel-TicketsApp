<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;
    use HasUuids;
    protected $guarded = [];
    protected $fillable = ['order_id', 'kid'];
    public $timestamps = false;


    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
