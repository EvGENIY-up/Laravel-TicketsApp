import React from 'react';
import ReactDOM from 'react-dom/client';
import Ticket from './Ticket';

function App(props) {
    return (
        <div className="App">
            <div className="wrapper">
                {Object.values(props).map((item, index) => (
                <Ticket
                    key={item.id}
                    {...item}
                />))
                }
            </div>
        </div>
    );
}

export default App;

if (document.getElementById('root')) {
    const element = document.getElementById('root')
    const props = element.getAttribute('props');
    const decodeProps = JSON.parse(props)
    const root = ReactDOM.createRoot(element);
    root.render(<App {...decodeProps} />);
}
