import React, { Component } from "react";


import Moon from "./Moon";
import Info from "./Info";

import styled, { keyframes } from "styled-components";



const Container = styled.div`
  position: absolute;
  top: 2950px;
  left: 2950px;

  z-index:2;

  transform: rotate(-${props => props.rotation}deg) translateX(${props => props.distance}px) rotate(${props => props.rotation}deg);
   
};
`;



export default class Planet extends Component {

  // componentDidMount() {
  //   console.log("getting moons");
  //   fetch(`http://localhost:3000/planets/${this.props.planet.id}/moons`)
  //     .then(res => res.json())
  //     .then(data => this.setState({ moons: data }));
  // }

  render() {
    return (
      <Container onClick={this.props.showHandler} rotation={this.props.planet.rotation * (180/Math.PI)}
      distance={this.props.planet.distance}>
        <img
          style={{height: '100px',
            width: '100px'}}
          src={ this.props.planet.image}
          alt=""
        />
        
        <Info
          favoritePlanet={this.props.favoritePlanet}
          planet={this.props.planet}
          show={this.props.show}
        />

        {/* {this.state.moons.map((moon, idx) => (
          <Moon
            key={idx}
            planetTop={this.state.top}
            planetLeft={this.state.left}
            moon={moon}
          />
        ))} */}
        
      </Container>
    );
  }
}
