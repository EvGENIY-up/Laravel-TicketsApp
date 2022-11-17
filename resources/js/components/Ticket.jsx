import React from "react";


function Ticket({ id, title, description, adult_price, pier_price, routes, kid_price }) {

  //const [modalOpened, setModalOpened] = React.useState(false);
  const [filteredDates, setFilteredDates] = React.useState([]);
  const [nextDates, setNextDates] = React.useState(routes);
  
  React.useEffect(() => {
    renderFilteredDates()
  }, [])

  const renderFilteredDates = () => {
    const filtered = nextDates.filter((item, index) =>
      index <= 2
    ).map((item) => item.time.split('').slice(10,-3).join(''));
    setFilteredDates(filtered);
    setNextDates(prev=> prev.slice(3))
  }


    return (
        <div className="ticket">
          <img src="img/1.png" alt="Принт события" className="ticket__img" />
          <div className="ticket__info">
            <div className="header-reverse">
              <div className="ticket__time">
                <img src="img/time.svg" alt="" className="time-route__img" />
                <p className="time-route">2 часа</p>
              </div>
              <h3 className="ticket__title">{title}
              </h3>
            </div>
            <div className="ticket-setting">
              <img src="img/on.svg" alt="Включено" className="ticket-setting__img" />
              <p className="ticket_setting__title">Билет на целый день</p>
            </div>
             <div className="ticket-setting">
              <img src="img/on.svg" alt="Включено" className="ticket-setting__img" />
              <p className="ticket_setting__title">Неограниченное число катаний</p>
            </div>
             <div className="ticket-setting">
              <img src="img/on.svg" alt="Включено" className="ticket-setting__img" />
              <p className="ticket_setting__title">6 остановок у главных достопримечательностей</p>
            </div>
            <div className="big-info">
              <div className="ticket-setting">
                <img src="img/on.svg" alt="Включено" className="ticket-setting__img ticket-setting_img-big" />
                <p className="ticket_setting__title">Ближайший рейс сегодня</p>
              </div>
            <div className="ticket__travel-time">
              {filteredDates.map((item,index) =>
                <p key={index} className="travel-time">{item}</p>
              )}
              {nextDates.length >= 1 ? <p onClick={renderFilteredDates} className="travel-time cu-p">ещё...</p> : null }
            </div>
            </div>
            <div className="ticket__down-position">
              <div className="prices">
                        <h1 className="price-app">{adult_price} Р</h1>
                        
                <p className="price-pier">{pier_price} Р на причале</p>
              </div>
              <button onClick={()=> setModalOpened(true)} className="more-button cu-p">Подробнее</button>
            </div>
          </div>
        {/*modalOpened ? <Modal id={id} setModalOpened={setModalOpened} description={description}  title={title} adult_price={adult_price} kid_price={kid_price} dates={dates}  /> : null*/}
        </div>
    )
}

export default Ticket;