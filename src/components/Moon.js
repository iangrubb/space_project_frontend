import React, { Component } from "react";
import MoonPic from "../images/moon.svg";

const randomizer = Math.random() > 0.5 ? 1 : -1;

export default class Moon extends Component {
  state = {
    top: Math.floor(this.props.planetTop * (1 - Math.random() * randomizer)),
    left: Math.floor(this.props.planetLeft * (1 - Math.random() * randomizer)),
    name: this.props.moon.name,
    image: MoonPic
  };

  render() {
    console.log(this.state);
    const planetStyle = {
      position: "absolute",
      height: `60px`,
      width: `60px`,
      top: `${this.state.top}px`,
      left: `${this.state.left}px`,
      zIndex: 0
    };
    return (
      <div>
        <img src={this.state.image} style={planetStyle} alt="" />
      </div>
    );
  }
}
