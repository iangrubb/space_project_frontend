import React, { Component } from "react";
import Star from "./Star";
import Planet from "./Planet";
import Constellation from "./Constellation";

const SPACE_WIDTH = 3000;
const SPACE_HEIGHT = 3000;

const stars = [...Array(2000).keys()].map(num => {
  const left = Math.floor(SPACE_WIDTH * Math.random());
  const top = Math.floor(SPACE_HEIGHT * Math.random());
  const diameter = Math.floor(Math.random() * 3) + 2;
  const color = `hsl(0, 0%, ${Math.floor(Math.random() * 25 + 55)}%)`;

  return { left: left, top: top, diameter: diameter, color: color };
});

const processRawConstellation = con => {
  const split = con.split(" ");
  // Default height and width is 400

  const nodes = split[4]
    .split("[")[1]
    .split("center")
    .slice(1, split[4].length)
    .map(x => x.split(":"))
    .map(y => y.slice(2, 4))
    .map(z => [z[0].split(",")[0], z[1].split("}")[0]]);

  const processedNodes = nodes.map((n, idx) => {
    return { star_id: idx, x: parseInt(n[0]), y: parseInt(n[1]) };
  });

  const lines = split[5]
    .split("source")
    .slice(1, split[5].length)
    .map(x => x.split(",").slice(0, 2))
    .map(y => [y[0].split(":")[1], y[1].split(":")[1].split("}")[0]]);

  const processedLines = lines.map((n, idx) => {
    return { line_id: idx, to: parseInt(n[0]), from: parseInt(n[1]) };
  });

  const fullyProcessedLines = processedLines.map(n => {
    const to_star = processedNodes.find(node => node.star_id === n.to);

    const from_star = processedNodes.find(node => node.star_id === n.from);

    return {
      line_id: n.line_id,
      to: { x: to_star.x, y: to_star.y },
      from: { x: from_star.x, y: from_star.y }
    };
  });

  return {
    stars: processedNodes,
    lines: fullyProcessedLines
  };
};

const constellations = [
  processRawConstellation(
    `<Graph indexType="custom" height="400" width="400" nodes={[{label:0,center:{x:220,y:129.1}},{label:1,center:{x:139.7,y:149.7}},{label:2,center:{x:74.8,y:108}},{label:3,center:{x:147.7,y:31.8}},{label:4,center:{x:337.1,y:168.2}},{label:5,center:{x:149,y:335.1}},{label:6,center:{x:70.9,y:370.9}},{label:7,center:{x:189.4,y:376.8}},{label:8,center:{x:323.8,y:394.7}}]} edges={[{source:8,target:7},{source:7,target:5},{source:5,target:6},{source:0,target:5},{source:0,target:4},{source:0,target:1},{source:1,target:2},{source:2,target:3},{source:3,target:1}]} />`
  ),
  processRawConstellation(
    `<Graph indexType="custom" height="400" width="400" nodes={[{label:1,center:{x:49.9,y:138.3}},{label:0,center:{x:131.1,y:190.7}},{label:2,center:{x:172.2,y:151}},{label:3,center:{x:192.7,y:102}},{label:4,center:{x:133.1,y:57}},{label:5,center:{x:62.9,y:51.7}},{label:6,center:{x:206.6,y:251}},{label:7,center:{x:204.6,y:286.1}},{label:8,center:{x:150.3,y:353.7}},{label:9,center:{x:114.6,y:366.2}},{label:10,center:{x:298.7,y:276.2}},{label:11,center:{x:213.9,y:204}},{label:12,center:{x:311.9,y:100}},{label:13,center:{x:286.8,y:69.6}},{label:14,center:{x:278.8,y:26.5}},{label:15,center:{x:371.5,y:76.2}}]} edges={[{source:1,target:0},{source:5,target:4},{source:4,target:3},{source:3,target:2},{source:2,target:1},{source:9,target:8},{source:8,target:7},{source:7,target:6},{source:6,target:1},{source:6,target:10},{source:6,target:11},{source:11,target:12},{source:12,target:13},{source:13,target:14},{source:12,target:15}]} />`
  ),
  processRawConstellation(
    `<Graph indexType="custom" height="400" width="400" nodes={[{label:4,center:{x:65.6,y:198.5}},{label:0,center:{x:137.7,y:262.9}},{label:1,center:{x:87.4,y:278.8}},{label:2,center:{x:333.8,y:318.6}}]} edges={[{source:3,target:2},{source:2,target:0},{source:0,target:1}]} />`
  ),
  processRawConstellation(
    `<Graph indexType="custom" height="400" width="400" nodes={[{label:4,center:{x:78.9,y:191.8}},{label:0,center:{x:133.8,y:194.7}},{label:1,center:{x:69.5,y:227.8}},{label:2,center:{x:33.1,y:284.8}},{label:3,center:{x:25.8,y:305.3}},{label:5,center:{x:27.2,y:343.7}},{label:6,center:{x:78.1,y:374.8}},{label:7,center:{x:134.4,y:383.5}},{label:8,center:{x:169.5,y:268.2}},{label:9,center:{x:162.3,y:319.9}},{label:10,center:{x:171.5,y:151.7}},{label:11,center:{x:207.3,y:119.2}},{label:12,center:{x:250.3,y:98}},{label:13,center:{x:306.6,y:132.5}},{label:14,center:{x:349.7,y:187.4}},{label:15,center:{x:400.7,y:167.6}},{label:16,center:{x:224.5,y:188.8}},{label:17,center:{x:268.2,y:237.8}},{label:18,center:{x:175.5,y:81.5}},{label:19,center:{x:129.8,y:82.1}},{label:20,center:{x:201.3,y:48.4}}]} edges={[{source:3,target:2},{source:2,target:0},{source:0,target:1},{source:4,target:3},{source:4,target:5},{source:5,target:6},{source:6,target:7},{source:9,target:7},{source:1,target:8},{source:8,target:9},{source:1,target:10},{source:11,target:10},{source:11,target:18},{source:18,target:19},{source:20,target:18},{source:16,target:17},{source:11,target:12},{source:12,target:13},{source:12,target:16},{source:13,target:14},{source:14,target:15}]} />`
  ),
  processRawConstellation(
    `<Graph indexType="custom" height="400" width="400" nodes={[{label:0,center:{x:169.4,y:55.3}},{label:1,center:{x:47.5,y:65.5}},{label:2,center:{x:203.9,y:218.4}},{label:4,center:{x:201.6,y:247.3}},{label:5,center:{x:156.2,y:357}},{label:3,center:{x:357,y:347}},{label:6,center:{x:313.9,y:217.2}},{label:7,center:{x:327.8,y:133.1}}]} edges={[{source:1,target:0},{source:0,target:2},{source:2,target:3},{source:3,target:4},{source:4,target:5},{source:5,target:6},{source:6,target:7},{source:7,target:0}]} />`
  )
];

export class Space extends Component {
  state = {
    starShift: 0,
    planets: []
  };

  stars = [...Array(1000).keys()].map(num => {
    const left = Math.floor(SPACE_WIDTH * Math.random());
    const top = Math.floor(SPACE_HEIGHT * Math.random());
    const diameter = Math.floor(Math.random() * 3) + 2;
    const color = `hsl(0, 0%, ${Math.floor(Math.random() * 25 + 55)}%)`;

    return { left: left, top: top, diameter: diameter, color: color };
  });

  componentDidMount() {
    setInterval(() => {
      this.setState({ starShift: this.state.starShift + 1 });
    }, 250);
    fetch("http://localhost:3000/planets")
      .then(res => res.json())
      .then(data => this.setState({ planets: data }));
  }

  render() {
    // can used on a div to prevent scroll
    const prevent = {
      position: "fixed",
      height: "100vh",
      width: "100vw",
      background: "hsla(100, 80%, 80%, 0%)"
    };

    return (
      <div style={this.spaceStyle}>
        <Constellation {...constellations[0]} top={500} left={500} />
        <Constellation {...constellations[1]} top={1500} left={1500} />
        <Constellation {...constellations[2]} top={100} left={1000} />
        <Constellation {...constellations[3]} top={2000} left={2000} />
        <Constellation {...constellations[4]} top={1000} left={100} />

        {this.state.planets.map(planet => (
          <Planet key={planet.id} planet={planet} />
        ))}

        {this.stars.map((star, index) => (
          <Star key={index} {...star} shift={this.state.starShift} />
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
