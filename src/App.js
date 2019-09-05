import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './views/Main'

function App() {

  const appStyle ={
    width: '100vw',
    height: '100vh'
  }
  return (
    <div style={appStyle} className="App">
      <Main />
    </div>
  );
}

export default App;
