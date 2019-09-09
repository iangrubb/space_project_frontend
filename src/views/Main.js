import React, { Component } from "react";
import Space from "../components/Space";

export class Main extends Component {
  state = { scrollTop: 0, scrollLeft: 0 };

  constructor(props) {
    super(props);
    this.mainScreen = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.scrollTop !== this.state.scrollTop ||
      prevState.scrollLeft !== this.state.scrollLeft
    ) {
      this.mainScreen.current.scrollLeft = this.state.scrollLeft;
      this.mainScreen.current.scrollTop = this.state.scrollTop;
    }
  }

  componentDidMount() {
    this.setState({ scrollTop: 2300, scrollLeft: 3300 });
  }

  handleScroll = e => {
    console.log(this.state);
    this.setState({
      scrollTop: e.target.scrollTop,
      scrollLeft: e.target.scrollLeft
    });
  };

  render() {
    return (
      <div style={this.windowFrameStyle}>
        <div
          style={this.windowStyle}
          ref={this.mainScreen}
          onScroll={this.handleScroll}
        >
          <Space />
        </div>
      </div>
    );
  }

  windowStyle = {
    position: "fixed",
    overflow: "scroll",

    top: "1vh",
    left: "1vw",
    height: "97vh",
    width: "97vw",

    borderTop: ".5vh double #222222",
    borderBottom: ".5vh double #222222",
    borderLeft: ".5vw double #222222",
    borderRight: ".5vw double #222222",
    boxShadow: "0 0 1vw white",

    borderRadius: "100px"
  };

  windowFrameStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    height: "100%",
    width: "100%",
    background:
      "linear-gradient(48deg, rgba(188,183,200,1) 6%, rgba(123,118,133,1) 15%, rgba(178,172,187,1) 23%, rgba(132,126,143,1) 30%, rgba(176,170,188,1) 37%, rgba(113,108,121,1) 43%, rgba(166,163,171,1) 48%, rgba(128,123,138,1) 52%, rgba(111,103,127,1) 60%, rgba(177,173,187,1) 70%, rgba(149,143,162,1) 77%, rgba(102,97,110,1) 83%, rgba(114,110,122,1) 89%, rgba(171,166,180,1) 95%)"
  };
}

export default Main;
