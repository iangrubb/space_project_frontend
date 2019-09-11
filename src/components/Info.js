import React from "react";

import {Icon} from 'antd'

const Info = props => {
  let modalstyle = {
    position: "absolute",
    height: "125px",
    width: "100px",
    overflow: "auto",
    display: props.show ? "block" : "none",
    backgroundColor: "rgba(0,255,255,.6)",
    borderRadius: "15px",
    textAlign: "center",
    zIndex: 100
  };
  
  return (
    <div style={modalstyle}>
      <span>&times;</span>
      <p>Name:{props.planet.name}</p>
      <button onClick={props.favoritePlanet}><Icon type="like" /></button>
    </div>
  );
};

export default Info;
