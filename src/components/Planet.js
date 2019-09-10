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
import Info from "./Info";

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
    top: Math.floor(5000 * Math.random()),
    left: Math.floor(5000 * Math.random()),
    name: this.props.planet.name,
    image: sample[Math.floor(Math.random() * sample.length)],
    moons: [],
    show: false,
    info: this.props.planet.info
  };

  showHandler = e => {
    this.setState({ show: !this.state.show });
    this.props.show(this.state.info);
  };

  componentDidMount() {
    console.log("getting moons");
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
      left: `${this.state.left}px`,
      zIndex: 99
    };
    return (
      <>
        <img
          src={this.state.image}
          style={planetStyle}
          alt=""
          onClick={this.showHandler}
        />
        {/* {this.state.moons.map((moon, idx) => (
          <Moon
            key={idx}
            planetTop={this.state.top}
            planetLeft={this.state.left}
            moon={moon}
          />
        ))} */}
        <Info
          planet={this.state}
          show={this.state.show}
          planetStyle={planetStyle}
        />
      </>
    );
  }
}
