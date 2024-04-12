import logo from './logo.svg';
import './App.css';
import { MsalProvider } from '@azure/msal-react';
import { NavBar } from './components/NavBar';
import { Profile } from './components/Profile';
import { useState } from "react";

/// https://www.youtube.com/watch?v=7oPSL5wWeS0

function App({ msalInstance }) {
    const [showData, setShowData] = useState(false);
    return (
    <MsalProvider instance={msalInstance}>
      <div className="App">
        <header className="App-header">
          <NavBar/>
          <button onClick={() => setShowData(!showData)}>Show Data</button>
          { showData ? <Profile/> : <></>}
          
          
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>
            Test
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </MsalProvider>
  );
}

export default App;
