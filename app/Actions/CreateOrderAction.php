<?php

namespace App\Actions;

use App\Models\Order;
use App\Models\Ticket;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CreateOrderAction
{

    /**
     * Создает билеты
     *  
     * @param integer $order_id номер заказа, к которому относиться билет
     * @param  bool $is_kid Детский тип билета
     * @return void
     */

    private static function createTicket($order_id, $is_kid = false)
    {
        $ticket = new Ticket();
        $ticket->order_id = $order_id;
        $ticket->kid = $is_kid;
        $ticket->save();
    }

    /**
     * Записывает заказ в БД и создает билеты по номеру этого заказа.
     *  
     * @param array $order данные заказа(массив)
     * @param  integer $ticket_kid_quanity Кол-во детских билетов
     * @return integer $ticket_adult_quanity Кол-во взрослых билетов
     * @return Order
     */

    public static function handle($order, $ticket_adult_quanity, $ticket_kid_quanity = 0)
    {
        $newOrder = new Order($order);
        $newOrder->save();

        for ($i = 0; $i < $ticket_adult_quanity; $i++) {
            createOrderAction::createTicket($newOrder->id);
        }

        if ($ticket_kid_quanity) {
            for ($i = 0; $i < $ticket_kid_quanity; $i++) {
                createOrderAction::createTicket($newOrder->id, true);
            }
        }

        return $order;
    }
}
