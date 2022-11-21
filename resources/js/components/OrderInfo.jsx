function Orderinfo({ orderValues, setModalOpened, departureTime, adult_price, kid_price, route }) {
    
    const timeTravel = 20;
    const fullPrice = adult_price * orderValues.ticket_adult_quanity + kid_price * orderValues.ticket_kid_quanity;
    return (
    <div className="order-info">
        <p className="order-info__text">
            Вы выбрали {orderValues.ticket_adult_quanity + orderValues.ticket_kid_quanity} билета по маршруту {route} стоимостью {fullPrice}р.
            Это путешествие займет у вас {orderValues.additional_route_id ? timeTravel * 2 : timeTravel} минут. 
            Теплоход отправляется {departureTime}.
        </p>
        <button onClick={() =>setModalOpened(false)} className="order__close">Закрыть</button>
    </div>
)
}

export default Orderinfo