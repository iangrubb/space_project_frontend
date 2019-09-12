import React from "react";

import { Icon } from "antd";

const Info = props => {
  let modalstyle = {
    position: "absolute",
    height: "100%",
    width: "100%",
    overflow: "auto",
    display: props.show ? "block" : "none",
    backgroundColor: "hsla(0,0%,50%,.2)",
    border: "3px solid white",
    borderRadius: "15px",
    textAlign: "center",
    zIndex: 100,
    wordWrap: "break-word"
  };
  return (
    <div style={modalstyle}>
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <h3 style={{ color: "white" }}>{props.planet.name}</h3>
        <button onClick={props.favoritePlanet} style={{ margin: "0 0 0 .5vw" }}>
          <Icon type="like" />
        </button>
      </span>
    </div>
  );
};

export default Info;
