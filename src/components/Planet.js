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

import styled, {keyframes} from 'styled-components'

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


const Circle = styled.img`
  position: absolute;
  height: 100px;
  width: 100px;
  top: 2950px;
  left: 2950px;

  transform: rotate(${props => props.rotation}deg) translateX(${props => props.distance}px) rotate(${props => props.rotation}deg);
  
};
`

export default class Planet extends Component {
  state = {
    top: 3000 - 50,
    left: 3000 - 50 + (2800 * ( this.props.planet.distanceFromSun/ 2147483647)),
    name: this.props.planet.name,
    image: sample[Math.floor(Math.random() * sample.length)],
    moons: [],
    info: this.props.planet.info
  };

  

  componentDidMount() {
    console.log("getting moons");
    fetch(`http://localhost:3000/planets/${this.props.planet.id}/moons`)
      .then(res => res.json())
      .then(data => this.setState({ moons: data }));
  }

  render() {

    const distance = 2800 * ( this.props.planet.distanceFromSun/ 2147483647)

    console.log(this.props.shift)
    
    return (
      <>
        <Circle
          rotation={0}
          distance={distance}
          src={this.state.image}
          alt=""
          onClick={this.props.showHandler}
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
          show={this.props.show}
        />
      </>
    );
  }
}
