import React, { Component } from "react";
import Space from "../components/Space";
import Map from "../components/Map";
import UserInfo from "../components/UserInfo";
import Favorites from "../components/Favorites";
import Search from "../components/Search";
import Details from "../components/Details";

const SPACE_WIDTH = 6000;
const SPACE_HEIGHT = 6000;

export class Main extends Component {
  state = {
    scrollTop: 0,
    scrollLeft: 0,
    windowTop: 0,
    windowLeft: 0,

    favoritesShow: false,
    mapShow: false,
    searchShow: false,
    detailsShow: false,

    show: undefined,

    planets: [],
    constellation: []
  };

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
    window.addEventListener("resize", this.updateWindowDimensions);
    this.updateWindowDimensions();
    setTimeout(() => this.center(), 100);

    fetch("http://localhost:3000/planets")
      .then(res => res.json())
      .then(data => {
        const planets = data.map(planet => {
          return {
            ...planet,
            top: Math.floor(Math.random() * 5800),
            left: Math.floor(Math.random() * 5800)
          };
        });
        this.setState({ planets: planets });
      });

    fetch("http://localhost:3000/constellations")
      .then(res => res.json())
      .then(data => this.setState({ constellation: data }));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () =>
    this.setState({
      windowTop: window.innerHeight,
      windowLeft: window.innerWidth
    });

  handleScroll = e => {
    this.setState({
      scrollTop: e.target.scrollTop,
      scrollLeft: e.target.scrollLeft
    });
  };

  zoomTo = (x, y) => {
    console.log(x, y);
    this.setState({
      scrollLeft: Math.max(
        0,
        Math.min(
          x - this.state.windowLeft / 2,
          SPACE_WIDTH - this.state.windowLeft / 2
        )
      ),
      scrollTop: Math.max(
        0,
        Math.min(
          x - this.state.windowTop / 2,
          SPACE_HEIGHT - this.state.windowTop / 2
        )
      )
    });
  };

  center = () =>
    this.setState({
      scrollTop: SPACE_HEIGHT / 2 - this.state.windowTop / 2,
      scrollLeft: SPACE_WIDTH / 2 - this.state.windowLeft / 2
    });

  toggleMap = () => this.setState({ mapShow: !this.state.mapShow });

  toggleFavorites = () =>
    this.setState({ favoritesShow: !this.state.favoritesShow });

  toggleSearch = () => {
    this.setState({ searchShow: !this.state.searchShow });
  };

  toggleDetails = () => this.setState({ detailsShow: !this.state.detailsShow });

  showHandler = planet => () => {
    if (this.state.show === planet) {
      this.setState({ show: undefined });
    } else {
      this.setState({ show: planet });
    }
  };

  render() {
    return (
      <div style={this.windowFrameStyle}>
        <div
          style={this.windowStyle}
          ref={this.mainScreen}
          onScroll={this.handleScroll}
        >
          <Space
            planets={this.state.planets}
            showHandler={this.showHandler}
            show={this.state.show}
            favoritePlanet={this.props.favoritePlanet}
            constellations={this.state.constellation}
          />
        </div>

        <UserInfo
          logOut={this.props.logOut}
          toggleFavorites={this.toggleFavorites}
          username={"Ian"}
          center={this.center}
        />

        <Map
          planets={this.state.planets}
          scrollLeft={this.state.scrollLeft}
          scrollTop={this.state.scrollTop}
          windowLeft={this.state.windowLeft}
          windowTop={this.state.windowTop}
          show={this.state.mapShow}
          toggleMap={this.toggleMap}
        />

        <Search
          zoom={this.zoomTo}
          showHandler={this.showHandler}
          planets={this.state.planets}
          show={this.state.searchShow}
          toggleSearch={this.toggleSearch}
        />

        <Favorites
          showHandler={this.showHandler}
          zoom={this.zoomTo}
          show={this.state.favoritesShow}
          userPlanets={this.props.userPlanets}
          unfavoritePlanet={this.props.unfavoritePlanet}
        />
        <Details
          show={this.state.detailsShow}
          toggleDetails={this.toggleDetails}
          planet={this.state.show}
        />
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
