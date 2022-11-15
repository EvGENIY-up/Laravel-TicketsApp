import React from 'react';
import ReactDOM from 'react-dom/client';

function App(props) {   
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">{props.title}</div>

                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

if (document.getElementById('root')) {
    const element = document.getElementById('root')
    const props = Object.assign({}, (element.dataset)).main;
    //props => json($array)
    const root = ReactDOM.createRoot(element);
    root.render(<App {...props} />);
}
