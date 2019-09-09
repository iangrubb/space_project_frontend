import React from "react";

const Info = props => {
  let modalstyle = {
    position: "absolute",
    height: "100px",
    width: "100px",
    overflow: "auto",
    display: props.show ? "block" : "none",
    overflow: "auto",
    top: `${props.planet.top - 50}px`,
    left: `${props.planet.left + 50}px`,
    backgroundColor: "rgba(0,255,255,.8)",
    borderRadius: "15px",
    textAlign: "center",
    zIndex: 100
  };
  return (
    <div style={modalstyle}>
      <span>&times;</span>
      <p>Name:{props.planet.name}</p>
    </div>
  );
};

export default Info;
