import React from 'react';
import './App.css';
import Main from './views/Main'
import Landing from './views/Landing';
import { Route, Switch, withRouter } from 'react-router-dom'

const URL = 'http://localhost:3000'

class App extends React.Component {

  state = {userId: null}

  setUserId = number => {
    this.setState({userId: number})
  }

  componentDidMount () {
    const token = localStorage.getItem('token')
    if (token) {
      fetch(`${URL}/autologin`, {
        headers: {
          'accept': 'application/json', 
          Authorization: token
        }
      })
        .then(response => response.json())
        .then(data => {
          
          console.log("test", data)
          this.setState({userId: data})
          // this.props.history.push('/space')
        })        
    }

  }

  appStyle ={
    position: 'fixed',
    margin: '0',
    width: '100vw',
    height: '100vh',
  }
  
  render () {
    return (
      <div style={this.appStyle} className="App">
          <Switch>
            {/* <Route exact path="/space" render={()=> this.state.userId ? <Main userId={this.state.userId}/> : this.props.history.push('/welcome')}/> */}
            <Route exact path="/space" render={()=> <Main userId={this.state.userId}/>}/>
            <Route path="/" render={() => <Landing setUserId={this.setUserId} />} />
          </Switch>
          
      </div>
    );
  }
}

export default withRouter(App);
