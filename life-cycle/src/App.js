import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import ClassComponent from './components/ClassComponent';
import FunctionComponent from './components/FunctionComponent';

function App() {
  const [classComponentVisible, setClassComponentVisible] = useState(false)
  const [functionComponentVisible, setfunctionComponentVisible] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        {/* It would seem that the unmound is called more times than I would expect */}
        <button onClick={() => setClassComponentVisible(!classComponentVisible)}>Toggle Class Component</button>
        {classComponentVisible && <ClassComponent />}
        {/* It would seem that all methods is called more times than I would expect */}
        <button onClick={() => setfunctionComponentVisible(!functionComponentVisible)}>Toggle Function Component</button>
        {functionComponentVisible && <FunctionComponent />}

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
  );
}

export default App;
