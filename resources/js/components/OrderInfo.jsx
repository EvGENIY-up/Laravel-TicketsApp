function Orderinfo({ orderValues, setModalOpened }) {
    
const timeTravel = 15
    
return (
    <div className="order-info">
        <p className="order-info__text">
            Вы выбрали {orderValues.kidTickets + orderValues.adultTickets} билета по маршруту из {orderValues.route} стоимостью {orderValues.fullPrice}.
            Это путешествие займет у вас {orderValues.secondRoute ? timeTravel * 2 : timeTravel} минут. 
            Теплоход отправляется в {orderValues.firstRoute}, а прибудет в 20:00.
        </p>
        <button onClick={() =>setModalOpened(false)} className="order__close">Закрыть</button>
    </div>
)
}

export default Orderinfo