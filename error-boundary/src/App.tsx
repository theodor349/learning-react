import React from 'react';
import logo from './logo.svg';
import './App.css';
import SuccessComponent from './components/SuccessComponent';
import FailingComponent from './components/FailingComponent';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <div style={{background: 'green'}}>
        <SuccessComponent/>
      </div>
      <div style={{background: 'yellow'}}>
        <ErrorBoundary>
          <FailingComponent/>
          <SuccessComponent/>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
