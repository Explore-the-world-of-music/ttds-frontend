import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(" loading...");

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      var datetime = new Date(0);
      datetime.setSeconds(data.time)
      datetime = datetime.toISOString().substr(11, 8);
      setCurrentTime(datetime);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <p>The current time is {currentTime}.</p>
      </header>
    </div>
  );
}

export default App;