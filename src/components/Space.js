import React, { Component } from "react";
import Star from "./Star";
import Planet from "./Planet";
import Constellation from "./Constellation";


const SPACE_WIDTH = 6000;
const SPACE_HEIGHT = 6000;


export class Space extends Component {

  stars = [...Array(2000).keys()].map(num => {
    const left = Math.floor(SPACE_WIDTH * Math.random());
    const top = Math.floor(SPACE_HEIGHT * Math.random());
    const diameter = Math.floor(Math.random() * 3) + 2;
    const color = `hsl(0, 0%, ${Math.floor(Math.random() * 25 + 55)}%)`;

    return {
      left: left,
      top: top,
      diameter: diameter,
      color: color,
      pageWidth: SPACE_WIDTH
    };
  });

  
  
  render() {
    
    const prevent = {
      position: "fixed",
      height: "100vh",
      width: "100vw",
      background: "hsla(100, 80%, 80%, 0%)"
    };
   
    return (
      <div style={this.spaceStyle}>
                    
        {this.props.constellations.map( (cons, idx) => (
          <Constellation cons={cons} key={idx} favoritePlanet={this.props.favoritePlanet(cons)} showHandler={this.props.showHandler(cons)} show={this.props.show === cons}/>
        ))}

        {this.props.planets
          .map(planet => (
            <Planet
              favoritePlanet={this.props.favoritePlanet(planet)}
              key={planet.id}
              planet={planet}
              showHandler={this.props.showHandler(planet)}
              show={this.props.show === planet}
            />
          ))}

        {this.stars.map((star, index) => (
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
