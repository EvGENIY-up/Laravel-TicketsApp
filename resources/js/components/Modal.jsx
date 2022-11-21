import axios from "axios";
import React from "react";
import Orderinfo from "./OrderInfo";

function Modal({ id, setModalOpened, title, description, routes, adult_price, kid_price, pier_price }) {

    const [isDoubleRoute, setIsDoubleRoute] = React.useState(false);
    const [times, setTimes] = React.useState([]);
    const [secondTimes, setSecondTimes] = React.useState([]);
    const [orderInfo, setOrderInfo] = React.useState(false);
    const [orderValues, setOrderValues] = React.useState({});
    const [modalBtn, setModalBtn] = React.useState(true);
    const [timesForBack, setTimesForBack] = React.useState([]);
    const [departureTime, setDepartureTime] = React.useState([]);
    const [route, setRoute] = React.useState('')

    const filterTimes = (event) => {
        let filteredDates = [];
        let filteredSecondDates = [];
        switch (event.target.value) {
            case '2':
                filteredDates = routes.filter((item) => item.is_backward === 1);
                filteredSecondDates = routes.filter((item) => item.is_backward === 0);
                setRoute('из А в B и обратно в A');
                break;
            case '0':
                filteredDates = routes.filter((item) => item.is_backward === 1)
                setRoute('из A в B');
                break;
            case '1':
                filteredDates = routes.filter((item) => item.is_backward === 0);
                setRoute('из B в A');
                break;
            default:
                break;
        }
        setIsDoubleRoute((Number(event.target.value) > 1) ? true : false)
        setTimes(filteredDates);
        setSecondTimes(filteredSecondDates);
    }
    
    const filterSecondTimesByFirst = (event) => {
        const eventId = Number(event.target.value);
        const timesById = routes.filter((item) => item.id === eventId);
        const firstTime = timesById[0].time;
        setDepartureTime(firstTime);
        setTimesForBack(secondTimes.filter((item) => item.time > firstTime));
    } 

    const handleSubmit = (event) => {
        event.preventDefault();
        const requestBody = {};
        const formData = new FormData(event.currentTarget);
        formData.forEach((value, property) => requestBody[property] = value);
        requestBody['group'] === 'on' ? requestBody['group'] = 1 : requestBody['group'] = 0;
        requestBody['preferential'] === 'on' ? requestBody['preferential'] = 1 : requestBody['preferential'] = 0;
        if (requestBody['ticket_adult_quanity'] > 20 ) {
            alert('Максимальное кол-ва взрослых билетов равно 20')
            return;
        }
        if (requestBody['ticket_kid_quanity'] > 20 ) {
            alert('Максимальное кол-ва детских билетов равно 20')
            return;
        }
        if (requestBody['route_id'] >= requestBody['additional_route_id'] ) {
            alert('Время отплытия не может быть больше времени прибытия')
            return;
        }
        delete requestBody.route
        for (let key in requestBody) {
            requestBody[key] = Number(requestBody[key]);
        }
        console.log(requestBody)
        axios.post('http://127.0.0.1:8000/order', requestBody).then(
            setOrderValues(requestBody),
            setOrderInfo(true),
            setModalBtn(false)
            
        ) .catch(function (error) {
            if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            } else if (error.request) {
            console.log(error.request);
            } else {
            console.log('Error', error.message);
            }
            console.log(error.config);
        });
            
    } 
    
    return (
        <div className="overlay">
            <div className="modal">
                <img onClick={() =>setModalOpened(false)} className="remove-btn" src="/img/close.svg" alt="Закрыть" />
                <form className="modal-content" onSubmit={handleSubmit}>
                <h2 value={id} className="modal__title">{title}</h2>
                <p className="modal__description">{description}</p>
                <p className="ticket-prices">Цены на билеты:</p>
                <div className="modal__prices">
                    <div className="section-adult">
                        <p className="adult__title">Взрослый</p>
                        <p className="price">{adult_price}р</p>
                    </div>
                    <div className="section-kid">
                        <p className="kid__title">Детский</p>
                        <p className="price">{kid_price}р</p>
                    </div>
                    <div className="section-pier">
                        <p className="pier__title">Пирс</p>
                        <p className="price">{pier_price}р</p>
                    </div>    
                </div>  
                <div className="modal-order">
                    <h3 className="order__title">Оформление заказа:</h3>
                    <p className="title">Выберите маршрут</p>
                    <select onChange={filterTimes} className="modal__select"  name="route" id="route" required>
                        <option value="0">из A в B</option>
                        <option value="1">из B в A</option>
                        <option value="2">из A в B и обратно в А</option>
                    </select>
                    <p className="title" >Выберите время</p>
                    <select onChange={filterSecondTimesByFirst} className="modal__select" name="route_id" id="route_id" required>
                        {times.map((item) =>
                            <option key={item.id} value={item.id}>{item.time}</option>
                        )}
                    </select>
                    {isDoubleRoute &&
                        <>
                            <p className="title" >Время обратного пути</p>
                            <select className="modal__select" name="additional_route_id" id="additional_route_id" required>
                                {timesForBack.map((item) =>
                                    <option key={item.id} value={item.id}>{item.time}</option>
                                )}
                            </select>
                        </>
                    }
                    <p className="title">Взрослые билеты "max20"</p>
                    <input className="input__number" type="text" name="ticket_adult_quanity" id="ticket_adult_quanity" required pattern="^[ 0-9]+$" ></input>
                    <p className="title">Детские билеты "max20"</p>
                    <input className="input__number" type="text" name="ticket_kid_quanity" id="ticket_kid_quanity" required pattern="^[ 0-9]+$" ></input>
                    <div className="choice__type">
                        <p className="title">Групповой билет</p>
                        <input type="checkbox" className="group" name="group" id="group"></input>
                    </div>
                    <div className="choice__type">
                        <p className="title">Льготный билет </p>
                        <input type="checkbox" className="preferential" name="preferential"id="preferential" ></input>
                    </div>
                </div>
                {modalBtn && <button type="sumbit" className="modal-btn" required>Посчитать</button>}
                {orderInfo &&  <Orderinfo orderValues={orderValues} setModalOpened={setModalOpened} departureTime={departureTime} adult_price={adult_price} kid_price={kid_price} route={route} />}
                </form>
                
            </div>
        </div>
    )
}

export default Modal;