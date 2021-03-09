import React from 'react';
import logo from './logo.png';
import './app.scss';

class App extends React.PureComponent {
    render() {
        return (
            <div className="DCMN-logo">
                <img src={logo} alt="DCMN logo" />
            </div>
        );
    }
}

export default App;
