import React, { Component } from "react";
import Space from "../components/Space";
import Map from "../components/Map";
import UserInfo from "../components/UserInfo";
import Favorites from "../components/Favorites";
import Search from "../components/Search";
import Details from "../components/Details";

import assignConstellationImages from "../helpers/assignConstellations";

import assignPlanetImage from "../helpers/assignImages";

const SPACE_WIDTH = 6000;
const SPACE_HEIGHT = 6000;

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const placeConstellations = constes => {
  shuffleArray(constes);

  return constes.map((cons, idx, array) => {
    const rotation = (idx / array.length) * 2 * Math.PI;

    const segment = (3 * idx) % 19;

    const distance = 2700 - segment * 100;

    return {
      ...cons,
      distance: distance,
      rotation: rotation,
      image: assignConstellationImages(cons.name)
    };
  });
};

const placePlanets = planets => {
  const updatedPlanets = planets.map(planet => {
    const newData = assignPlanetImage(planet.name);
    return { ...planet, ...newData };
  });

  const solarPlanets = updatedPlanets
    .filter(planet => planet.order < 10)
    .map(planet => {
      const rotation =
        Math.random() * (0.5 * Math.PI * ((planet.order % 4) + 1));
      const distance = planet.order * 275;

      return { ...planet, rotation: rotation, distance: distance };
    });

  const otherPlanets = updatedPlanets
    .filter(planet => planet.order === 10)
    .map(planet => {
      const rotation = (Math.random() * 10 + 40) * Math.ceil(Math.random() * 4);
      const distance = 2800 - Math.random() * 800;

      return { ...planet, rotation: rotation, distance: distance };
    });

  // determine position in solar

  // determine others

  return [...solarPlanets, ...otherPlanets];
};

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
    constellations: []
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

    fetch("https://stormy-cliffs-69535.herokuapp.com/planets")
      .then(res => res.json())
      .then(data => {
        const planets = placePlanets(data);
        this.setState({ planets: planets });
      });

    fetch("https://stormy-cliffs-69535.herokuapp.com/constellations")
      .then(res => res.json())
      .then(data => {
        const cons = placeConstellations(data);
        this.setState({ constellations: cons });
      });
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

  zoomTo = (distance, rotation) => {
    console.log(distance, rotation);

    const x = Math.cos(rotation) * distance + SPACE_WIDTH / 2;
    const y = -Math.sin(rotation) * distance + SPACE_HEIGHT / 2;

    console.log(Math.cos(rotation), Math.sin(rotation));

    console.log(x, y);

    const left = Math.max(
      0,
      Math.min(
        x - this.state.windowLeft / 2,
        SPACE_WIDTH - this.state.windowLeft / 2
      )
    );

    const top = Math.max(
      0,
      Math.min(
        y - this.state.windowTop / 2,
        SPACE_HEIGHT - this.state.windowTop / 2
      )
    );
    console.log(left, top);

    this.setState({
      scrollLeft: left,
      scrollTop: top
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
            constellations={this.state.constellations}
            showHandler={this.showHandler}
            show={this.state.show}
            favoritePlanet={this.props.favoritePlanet}
          />
        </div>

        <UserInfo
          logOut={this.props.logOut}
          toggleFavorites={this.toggleFavorites}
          username={this.props.username}
          center={this.center}
        />

        <Map
          planets={this.state.planets}
          constellations={this.state.constellations}
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
          constellations={this.state.constellations}
          show={this.state.searchShow}
          toggleSearch={this.toggleSearch}
        />

        <Favorites
          showHandler={this.showHandler}
          zoom={this.zoomTo}
          show={this.state.favoritesShow}
          userPlanets={this.props.userPlanets}
          unfavoritePlanet={this.props.unfavoritePlanet}
          possible={[...this.state.planets, ...this.state.constellations]}
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
