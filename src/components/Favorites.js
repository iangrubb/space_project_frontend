import React, { Component } from "react";
import styled from "styled-components";
import { Icon } from "antd";

const Container = styled.div`

    left 8.5vw;
    top: -32vh;

    position: fixed;
    width: 18vw;
    height: 26vw;

    transform: translateY(${props => (props.show ? "14vw" : "0")});
    transition: transform 0.6s;

    background: linear-gradient(48deg, rgba(188,183,200,1) 6%, rgba(123,118,133,1) 15%, rgba(178,172,187,1) 23%, rgba(132,126,143,1) 30%, rgba(176,170,188,1) 37%, rgba(113,108,121,1) 43%, rgba(166,163,171,1) 48%, rgba(128,123,138,1) 52%, rgba(111,103,127,1) 60%, rgba(177,173,187,1) 70%, rgba(149,143,162,1) 77%, rgba(102,97,110,1) 83%, rgba(114,110,122,1) 89%, rgba(171,166,180,1) 95%);

    border: 0.1vw solid black;
    border-radius: 2vw;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    font-family: Orbitron, sans-serif;
    font-size: 1.2vw;
`;

const FaveList = styled.div`
  width: 80%;
  height: 24vw;
  margin: 1vw;

  border: 0.2vw double #eeeeee;
  border-radius: 0.4vw;
  box-shadow: 0 0 1vw white;

  height: 20vh;
  background: #333333;

  overflow: scroll;
  display: flex;
  flex-direction: column;
`;

export class Favorites extends Component {
  handleClick = planet => () => {
    this.props.showHandler(planet)();
    if (planet.distance === undefined) {
      console.log("nope");
      const realPlanet = this.props.possible.find(
        pla => pla.name === planet.name
      );
      this.props.zoom(realPlanet.distance, realPlanet.rotation);
    } else {
      this.props.zoom(planet.distance, planet.rotation);
    }
  };

  render() {
    let planets = this.props.userPlanets
      ? this.props.userPlanets.map(planet => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <p onClick={this.handleClick(planet)} style={{ color: "white" }}>
              {planet.name}
            </p>
            <button
              onClick={this.props.unfavoritePlanet(planet)}
              style={{ margin: "0 0 0 .5vw" }}
            >
              <Icon type="dislike" />
            </button>
          </div>
        ))
      : null;
    return (
      <Container show={this.props.show}>
        <FaveList>{planets}</FaveList>
      </Container>
    );
  }
}

export default Favorites;
