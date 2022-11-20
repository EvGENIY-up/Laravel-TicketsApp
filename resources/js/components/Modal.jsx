import axios from "axios";
import React from "react";
import Orderinfo from "./OrderInfo";

function Modal({ id, setModalOpened, title, description, routes, adult_price, kid_price }) {

    const [isDoubleRoute, setIsDoubleRoute] = React.useState(false);
    const [times, setTimes] = React.useState([]);
    const [secondTimes, setSecondTimes] = React.useState([]);
    const [orderInfo, setOrderInfo] = React.useState(false);
    const [orderValues, setOrderValues] = React.useState({});
    const [modalBtn, setModalBtn] = React.useState(true)

    const filterTimes = (event) => {
        let filteredDates = [];
        let filteredSecondDates = [];
        switch (event.target.value) {
            case '2':
                filteredDates = routes.filter((item) => item.is_backward === 1);
                filteredSecondDates = routes.filter((item) =>  item.is_backward === 0);
                break;
            case '0':
                filteredDates = routes.filter((item) =>  item.is_backward === 1)
                break;
            case '1':
                filteredDates = routes.filter((item) =>  item.is_backward === 0);
                break;
            default:
                break;
        }
        setIsDoubleRoute((Number(event.target.value) > 1) ? true : false)
        setTimes(filteredDates);
        setSecondTimes(filteredSecondDates);
    }
    
    const filterSecondTimesByFirst = (event) => {
        const firstTime = new Date(event.target.value);
        setSecondTimes(secondTimes.filter((item) => new Date(item.time) > firstTime));
        console.log(secondTimes);
        console.log(firstTime);
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
        axios.post('http://127.0.0.1:8000/order', requestBody).then(response => {    
            
        }) .catch(function (error) {
            if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
            } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            }
            console.log(error.config);
        });
            
    } 
    
    return (
        <div className="overlay">
            <div className="modal">
                <form onSubmit={handleSubmit}>
                <h2 value={id} className="modal__title">{title}<img onClick={() =>setModalOpened(false)} className="remove-btn" src="/img/close.svg" alt="Закрыть" />
                </h2>
                <p className="description">{description}</p>
                <div className="content">
                        <div className="content__choice">
                            <label className="checked width__modal">Выберите маршрут</label>
                            <select onChange={filterTimes} className="width__modal"  name="route" id="route" required>
                                <option value="0">из A в B</option>
                                <option value="1">из B в A</option>
                                <option value="2">из A в B и обратно в А</option>
                            </select>
                            <label className="checked width__modal" >Выберите время</label>
                            <select onChange={filterSecondTimesByFirst} className="width__modal" name="route_id" id="route_id" required>
                                {times.map((item) =>
                                    <option key={item.id} value={item.id}>{item.time}</option>
                                )}
                            </select>
                            {isDoubleRoute &&
                            <>
                                <label className="checked width__modal" >Выберите время обратного пути</label>
                                <select className="width__modal" name="additional_route_id" id="additional_route_id">
                                    {secondTimes.map((item) =>
                                        <option key={item.id} value={item.id}>{item.time}</option>
                                    )}
                                </select>
                            </>
                            }
                            <label className="checked width__modal">Количество взрослых билетов "max20"</label>
                            <input className="width__modal" name="ticket_adult_quanity" id="ticket_adult_quanity" required pattern="^[ 0-9]+$"></input>
                            <label className="checked width__modal">Количество детских билетов "max20"</label>
                            <input className="width__modal" name="ticket_kid_quanity"id="ticket_kid_quanity" required pattern="^[ 0-9]+$"></input>
                        </div>
                        <div className="content__price">
                            <label className="price-ticket">Цена взрослого билета</label>
                            <p className="adult__price">{adult_price} Р</p>
                            <label className="price-ticket">Цена детского билета</label>
                            <p className="kid__price">{kid_price} Р</p>
                            <div className="checkbox">
                                <label className="">Групповой блиет</label>
                                <input type="checkbox" className="preferential_ticket" name="group" id="group"></input>
                            </div>
                            <div className="checkbox">
                                <label className="">Льготный билет </label>
                                <input type="checkbox" className="preferential_ticket" name="preferential"id="preferential" ></input>
                            </div>
                        </div>
                    </div>
                    {modalBtn && <button type="sumbit" className="modal-btn" required>Посчитать</button>}
                   { orderInfo &&  <Orderinfo orderValues={orderValues} setModalOpened={setModalOpened} />}
                </form>
                
            </div>
        </div>
    )
}

export default Modal;