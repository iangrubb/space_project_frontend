import React, { Component } from "react";

export default class Planet extends Component {
  state = {
    top: Math.floor(2000 * Math.random()),
    left: Math.floor(2000 * Math.random()),
    name: this.props.planet.name
  };

  componentDidMount() {
    fetch(`http://localhost:3000/planets/${this.props.planet.id}/moons`)
      .then(res => res.json())
      .then(data => console.log(data));
  }

  render() {
    const planetStyle = {
      position: "absolute",
      height: `50px`,
      width: `50px`,
      top: `${this.state.top}px`,
      left: `${this.state.left}px`,
      background: `green`
    };
    return <div style={planetStyle}>{this.state.name}</div>;
  }
}
