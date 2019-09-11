import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  left: 6vw;
  bottom: -18.5vw;

  transform: translateY(${props => (props.show ? "-15vw" : "0")});
  transition: transform 0.6s;

  position: fixed;
  width: 40vw;
  height: 22vw;

  background: linear-gradient(
    48deg,
    rgba(188, 183, 200, 1) 6%,
    rgba(123, 118, 133, 1) 15%,
    rgba(178, 172, 187, 1) 23%,
    rgba(132, 126, 143, 1) 30%,
    rgba(176, 170, 188, 1) 37%,
    rgba(113, 108, 121, 1) 43%,
    rgba(166, 163, 171, 1) 48%,
    rgba(128, 123, 138, 1) 52%,
    rgba(111, 103, 127, 1) 60%,
    rgba(177, 173, 187, 1) 70%,
    rgba(149, 143, 162, 1) 77%,
    rgba(102, 97, 110, 1) 83%,
    rgba(114, 110, 122, 1) 89%,
    rgba(171, 166, 180, 1) 95%
  );

  border: 0.1vw solid black;
  border-radius: 2vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Monitor = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  height: 58%;

  overflow: scroll;

  border: 0.2vw double #eeeeee;

  border-radius: 0.4vw;
  box-shadow: 0 0 1vw white;

  background: #222222;

  color: white;
`;

const DetailsButton = styled.div`

    color: #eeeeee;
    background: #333333;

    font-family: Orbitron, sans-serif;
    font-size: 1.4vw;

    width: 30%;
    height: 6%;

    margin: 1vh 0;
    padding 1vh 0;

    border: solid #333333 .1vw;
    border-radius: .4vw;

    box-shadow: 0.1vw 0.2vw 0.1vw #222222;
    transform: translateY(-.2vh);

    :hover {
        background: #444444;
    }

    :active {
        transform: translateY(-0.1vh);
        box-shadow: 0.02vw 0.04vw 0 #222222;
    }    
`;

export class Details extends Component {
  render() {
    return (
      <Container show={this.props.show}>
        <DetailsButton onClick={this.props.toggleDetails}>
          <h3 style={{ margin: "0" }}>Details</h3>
        </DetailsButton>
        <Monitor>
          <p style={{ color: "white", width: "90%", textAlign: "left" }}>
            {this.props.planet === undefined ? null : this.props.planet.info}
          </p>
        </Monitor>
      </Container>
    );
  }
}

export default Details;
