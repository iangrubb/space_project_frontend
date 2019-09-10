import React from "react";

const Info = props => {
  let modalstyle = {
    position: "absolute",
    height: "125px",
    width: "100px",
    overflow: "auto",
    display: props.show ? "block" : "none",
    top: `${props.planet.top - 100}px`,
    left: `${props.planet.left + 50}px`,
    backgroundColor: "rgba(0,255,255,.6)",
    borderRadius: "15px",
    textAlign: "center",
    zIndex: 100
  };
  return (
    <div style={modalstyle}>
      <span>&times;</span>
      <p>Name:{props.planet.name}</p>
      <button>Add To Fav </button>
    </div>
  );
};

export default Info;
