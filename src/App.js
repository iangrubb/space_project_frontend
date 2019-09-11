import React from "react";
import "./App.css";
import Main from "./views/Main";
import Landing from "./views/Landing";
import { Route, Switch, withRouter } from "react-router-dom";

const URL = "http://localhost:3000";

class App extends React.Component {
  state = { userId: null, username: null, userPlanets: [] };

  setUserId = number => {
    this.setState({ userId: number });
  };

  setUserPlanets = number => {
    this.setState({ userPlanets: number });
  };

  setUsername = name => {
    this.setState({ username: name})
  }

  favoritePlanet = planet => () => {
    if (!this.state.userPlanets.includes(planet)) {
      fetch(`${URL}/users/${this.state.userId}/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json"
        },
        body: JSON.stringify({
          user: this.state.userId,
          planet: planet.id
        })
      });
      this.setState({ userPlanets: [...this.state.userPlanets, planet] });
    }
    // AND THEN FETCH
  };

  unfavoritePlanet = planet => e => {
    e.stopPropagation();
    fetch(`${URL}/users/${this.state.userId}/planets/${planet.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    this.setState({
      userPlanets: this.state.userPlanets.filter(p => planet.id !== p.id)
    });
    // AND THEN FETCH
  };

  logOut = () => {
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

          console.log("planets", data)
          
          this.setState({ userId: data.user, username: data.username });
          this.setState({ userPlanets: data.planets });
          this.props.history.push('/space')
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
                username={this.state.username}
                favoritePlanet={this.favoritePlanet}
                unfavoritePlanet={this.unfavoritePlanet}
              />
            )}
          />
          <Route
            path="/"
            render={() => (
              <Landing
                setUserId={this.setUserId}
                setUserPlanets={this.setUserPlanets}
                setUsername={this.setUsername}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
