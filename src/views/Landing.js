import React, { Component } from "react";
import Star from "../components/Star";
import styled from "styled-components";
import Form from "../components/Form";
import { withRouter } from "react-router-dom";

const FormChoiceButton = styled.div`
  background: ${props => (props.pressed ? "white" : "#eeeeee")};

  width: 48%;

  border: solid #333333 0.1vw;

  border-radius: 0.4vw;
  padding: 0;

  box-shadow: ${props =>
    props.pressed ? "0.06vw 0.08vw 0 #333333" : "0.1vw 0.2vw 0.1vw #333333"};
  transform: translateY(${props => (props.pressed ? "-.2vh" : "-0.4vh")});

  :hover {
    background: white;
  }

  :active {
    transform: translateY(-0.1vh);
    box-shadow: 0.02vw 0.04vw 0 #333333;
  }
`;

const FormContainer = styled.div`
  z-index: 2;
  display: flex;
  width: 84vw;
  justify-content: ${props => (props.flag ? "flex-start" : "flex-end")};
`;

const URL = "http://localhost:3000";

export class Landing extends Component {
  state = {
    starShift: 0,
    menu: null,
    error: ""
  };

  setMenu = menuName => () => {
    this.setState({ menu: menuName }, this.setState({ error: "" }));
  };

  // componentDidMount() {
  // setInterval(() => {
  //   this.setState({ starShift: this.state.starShift + 4 });
  // }, 100);
  // }

  stars = [...Array(400).keys()].map(num => {
    const left = Math.floor(1800 * Math.random());
    const top = Math.floor(1400 * Math.random());
    const diameter = Math.floor(Math.random() * 3) + 2;
    const color = `hsl(0, 0%, ${Math.floor(Math.random() * 25 + 55)}%)`;

    return {
      left: left,
      top: top,
      diameter: diameter,
      color: color,
      pageWidth: 1800
    };
  });

  logInHandler = e => {
    e.preventDefault();
    const config = {
      method: "POST",
      body: JSON.stringify({
        username: e.target.name.value,
        password: e.target.password.value
      }),
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      }
    };

    fetch(`${URL}/login`, config)
      .then(resp => resp.json())
      .then(data => {
        if (data.errors) {
          this.setState({ error: data.errors });
          console.log(data.errors);
        } else {
          this.setState({ error: "" });
          localStorage.setItem("token", data.token);
          this.props.setUserId(data.user);
          this.props.setUsername(data.username);
          this.props.setUserPlanets(data.planets);
          this.props.history.push("/space");
        }
      });
  };

  signUpHandler = e => {
    e.preventDefault();
    const config = {
      method: "POST",
      body: JSON.stringify({
        username: e.target.name.value,
        password: e.target.password.value
      }),
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      }
    };

    fetch(`${URL}/users`, config)
      .then(resp => resp.json())
      .then(data => {
        if (data.errors) {
          this.setState({ error: data.errors[0] });
        } else {
          this.setState({ error: "" });
          localStorage.setItem("token", data.token);
          this.props.setUserId(data.user);
          this.props.setUsername(data.username);
          this.props.setUserPlanets(data.planets);
          this.props.history.push("/space");
        }
      });
  };

  render() {
    const formContainerStyle = {
      zIndex: "2",

      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      padding: "1vw",
      margin: "0 0 4vh 0",
      width: "36%",

      borderRadius: "1vw",

      background:
        "linear-gradient(48deg, rgba(188,183,200,1) 6%, rgba(123,118,133,1) 15%, rgba(178,172,187,1) 23%, rgba(132,126,143,1) 30%, rgba(176,170,188,1) 37%, rgba(113,108,121,1) 43%, rgba(166,163,171,1) 48%, rgba(128,123,138,1) 52%, rgba(111,103,127,1) 60%, rgba(177,173,187,1) 70%, rgba(149,143,162,1) 77%, rgba(102,97,110,1) 83%, rgba(114,110,122,1) 89%, rgba(171,166,180,1) 95%)"
    };

    const titleWrapper = {
      zIndex: "2",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      width: "26%",
      borderRadius: "1vw",

      margin: "12vh 0 4vh 0",

      padding: "1vw",

      background:
        "linear-gradient(48deg, rgba(188,183,200,1) 6%, rgba(123,118,133,1) 15%, rgba(178,172,187,1) 23%, rgba(132,126,143,1) 30%, rgba(176,170,188,1) 37%, rgba(113,108,121,1) 43%, rgba(166,163,171,1) 48%, rgba(128,123,138,1) 52%, rgba(111,103,127,1) 60%, rgba(177,173,187,1) 70%, rgba(149,143,162,1) 77%, rgba(102,97,110,1) 83%, rgba(114,110,122,1) 89%, rgba(171,166,180,1) 95%)"
    };

    const titleStyle = {
      background: "#eeeeee",

      width: "100%",
      padding: "3vh 0 2vh 0",

      margin: "0",

      fontSize: "3vw",

      border: "solid #333333 .1vw",
      boxShadow: "0 0 1vw white",
      borderRadius: ".4vw"
    };

    const pageStyle = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",

      position: "fixed",
      top: "0",
      left: "0",
      height: "100%",
      width: "100%",

      background: "#111111",

      fontFamily: "Orbitron, sans-serif"
    };

    return (
      <div style={pageStyle}>
        <div style={titleWrapper}>
          <h1 style={titleStyle}>Title</h1>
        </div>

        <div style={formContainerStyle}>
          <FormChoiceButton
            pressed={this.state.menu === "Sign Up"}
            onClick={this.setMenu("Sign Up")}
          >
            <p>Want to Join?</p>
            <h3>Sign up!</h3>
          </FormChoiceButton>
          <FormChoiceButton
            pressed={this.state.menu === "Log In"}
            onClick={this.setMenu("Log In")}
          >
            <p>Have an Account?</p>
            <h3>Log in!</h3>
          </FormChoiceButton>
        </div>

        {this.state.menu === "Sign Up" ? (
          <Form
            submitHandler={this.signUpHandler}
            message={"Sign Up!"}
            nameError={this.state.error}
          />
        ) : null}
        {this.state.menu === "Log In" ? (
          <Form
            submitHandler={this.logInHandler}
            message={"Log In!"}
            nameError={this.state.error}
          />
        ) : null}

        {this.stars.map((star, index) => (
          <Star key={index} {...star} shift={this.state.starShift} />
        ))}
      </div>
    );
  }
}

export default withRouter(Landing);
