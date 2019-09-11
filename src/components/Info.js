import React from "react";

import { Icon } from "antd";

const Info = props => {
  let modalstyle = {
    position: "absolute",
    height: "100px",
    width: "125px",
    overflow: "auto",
    display: props.show ? "block" : "none",
    backgroundColor: "rgba(0,255,255,.6)",
    borderRadius: "15px",
    textAlign: "center",
    zIndex: 100,
    wordWrap: "break-word"
  };
  return (
    <div style={modalstyle}>
      <p>Name:{props.planet.name}</p>
      <button onClick={props.favoritePlanet}>
        <Icon type="like" />
      </button>
    </div>
  );
};

export default Info;
