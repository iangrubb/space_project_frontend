import React, { Component } from "react";

import Moon from "./Moon";
import Info from "./Info";

import styled, { keyframes } from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 2950px;
  left: 2950px;
  width: 200px;
  height: 200px;

  z-index:2;

  transform: rotate(-${props => props.rotation}deg) translateX(${props =>
  props.distance}px) rotate(${props => props.rotation}deg);
   
};
`;

export default class Planet extends Component {
  render() {
    return (
      <Container
        onClick={this.props.showHandler}
        rotation={this.props.planet.rotation * (180 / Math.PI)}
        distance={this.props.planet.distance}
      >
        <img
          style={{
            height: "100px",
            width: "100px",
            position: "absolute",
            top: "50px",
            left: "50px"
          }}
          src={this.props.planet.image}
        />
        <Info
          favoritePlanet={this.props.favoritePlanet}
          planet={this.props.planet}
          show={this.props.show}
        />
      </Container>
    );
  }
}
