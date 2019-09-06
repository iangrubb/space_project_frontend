import React, { Component } from "react";
import Star from "./Star";
import Planet from "./Planet";

const SPACE_WIDTH = 3000;
const SPACE_HEIGHT = 3000;

const stars = [...Array(2000).keys()].map(num => {
  const left = Math.floor(SPACE_WIDTH * Math.random());
  const top = Math.floor(SPACE_HEIGHT * Math.random());
  const diameter = Math.floor(Math.random() * 3) + 2;
  const color = `hsl(0, 0%, ${Math.floor(Math.random() * 25 + 55)}%)`;

  return { left: left, top: top, diameter: diameter, color: color };
});

export class Space extends Component {
  state = { planets: [] };
  componentDidMount() {
    fetch("http://localhost:3000/planets")
      .then(res => res.json())
      .then(data => this.setState({ planets: data }));
  }

  render() {
    return (
      <div style={this.spaceStyle}>
        {this.state.planets.map(planet => (
          <Planet key={planet.id} planet={planet} />
        ))}
        {stars.map((star, index) => (
          <Star key={index} {...star} />
        ))}
      </div>
    );
  }

  spaceStyle = {
    width: `${SPACE_WIDTH}px`,
    height: `${SPACE_HEIGHT}px`,
    background: "#111111"
  };
}

export default Space;
