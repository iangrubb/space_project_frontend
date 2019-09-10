import React from "react";
import "./App.css";
import Main from "./views/Main";
import Landing from "./views/Landing";
import { Route, Switch, withRouter } from "react-router-dom";

const URL = "http://localhost:3000";

class App extends React.Component {
  state = { userId: null, userPlanets: [] };

  setUserId = number => {
    this.setState({ userId: number });
  };

  setUserPlanets = number => {
    this.setState({ userPlanets: number });
  };

  logOut = () => {
    console.log(this.state, localStorage.getItem("token"));
    this.setState({ userId: null });
    localStorage.removeItem("token");
    this.props.history.push("/welcome");
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${URL}/autologin`, {
        headers: {
          accept: "application/json",
          Authorization: token
        }
      })
        .then(response => response.json())
        .then(data => {
          this.setState({ userId: data.user });
          this.setState({ userPlanets: data.planets });
          // this.props.history.push('/space')
        });
    }
  }

  appStyle = {
    position: "fixed",
    margin: "0",
    width: "100vw",
    height: "100vh"
  };

  render() {
    console.log(`APP`, this.state.userId);
    return (
      <div style={this.appStyle} className="App">
        <Switch>
          {/* <Route exact path="/space" render={()=> this.state.userId ? <Main userId={this.state.userId}/> : this.props.history.push('/welcome')}/> */}
          <Route
            exact
            path="/space"
            render={() => (
              <Main
                logOut={this.logOut}
                userId={this.state.userId}
                userPlanets={this.state.userPlanets}
              />
            )}
          />
          <Route
            path="/"
            render={() => (
              <Landing
                setUserId={this.setUserId}
                setUserPlanets={this.setUserPlanets}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
