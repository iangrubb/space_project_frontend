import React, { Component } from "react";
import PlanetPic from "../images/planet.png";
import DestroyedPlanet from "../images/destroyed-planet.png";
import Mars from "../images/mars.png";
import Asteroid from "../images/asteroid.png";
import Saturn from "../images/saturn.png";
import Star from "../images/star.png";
import Sun from "../images/sun.png";
import Ufo from "../images/ufo.png";
import Uranus from "../images/uranus.png";
import Moon from "./Moon";

const sample = [
  PlanetPic,
  DestroyedPlanet,
  Mars,
  Saturn,
  Star,
  Sun,
  Ufo,
  Uranus,
  Asteroid
];

export default class Planet extends Component {
  state = {
    top: Math.floor(6000 * Math.random()),
    left: Math.floor(6000 * Math.random()),
    name: this.props.planet.name,
    image: sample[Math.floor(Math.random() * sample.length)],
    moons: []
  };

  componentDidMount() {
    console.log("getting moons")
    fetch(`http://localhost:3000/planets/${this.props.planet.id}/moons`)
      .then(res => res.json())
      .then(data => this.setState({ moons: data }));
  }

  render() {
    const planetStyle = {
      position: "absolute",
      height: `200px`,
      width: `200px`,
      top: `${this.state.top}px`,
      left: `${this.state.left}px`
    };
    return (
      <div>
        <img src={this.state.image} style={planetStyle} alt="" />
        {this.state.moons.map((moon,idx) => (
          <Moon
            key={idx}
            planetTop={this.state.top}
            planetLeft={this.state.left}
            moon={moon}
          />
        ))}
      </div>
    );
  }
}
