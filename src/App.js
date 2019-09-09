import React from 'react';
import './App.css';
import Main from './views/Main'
import Landing from './views/Landing';

class App extends React.Component {

  appStyle ={
    position: 'fixed',
    margin: '0',
    width: '100vw',
    height: '100vh',
  }
  
  render () {
    return (
      <div style={this.appStyle} className="App">
          {/* <Landing /> */}
          <Main />
      </div>
    );
  }
}

export default App;
