import React from 'react';
import logo from './img/bitly-logo.svg';
import './css/App.css';
import { ShortenUrlForm } from './components';

function App() {
    return (
        <div className="App">
            <img src={logo} className="App-logo" alt="logo" />
            <p>The power of the link.</p>
            <ShortenUrlForm />
        </div>
    );
}

export default App;
