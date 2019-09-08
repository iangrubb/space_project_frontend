import React, { Component } from "react";
import Star from "./Star";
import Planet from "./Planet";
import Constellation from "./Constellation";

const SPACE_WIDTH = 6000;
const SPACE_HEIGHT = 6000;

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
  // Canis Major
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:0,center:{x:220,y:129.1}},{label:1,center:{x:139.7,y:149.7}},{label:2,center:{x:74.8,y:108}},{label:3,center:{x:147.7,y:31.8}},{label:4,center:{x:337.1,y:168.2}},{label:5,center:{x:149,y:335.1}},{label:6,center:{x:70.9,y:370.9}},{label:7,center:{x:189.4,y:376.8}},{label:8,center:{x:323.8,y:394.7}}]} edges={[{source:8,target:7},{source:7,target:5},{source:5,target:6},{source:0,target:5},{source:0,target:4},{source:0,target:1},{source:1,target:2},{source:2,target:3},{source:3,target:1}]} />`),
  // Andromeda
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:1,center:{x:49.9,y:138.3}},{label:0,center:{x:131.1,y:190.7}},{label:2,center:{x:172.2,y:151}},{label:3,center:{x:192.7,y:102}},{label:4,center:{x:133.1,y:57}},{label:5,center:{x:62.9,y:51.7}},{label:6,center:{x:206.6,y:251}},{label:7,center:{x:204.6,y:286.1}},{label:8,center:{x:150.3,y:353.7}},{label:9,center:{x:114.6,y:366.2}},{label:10,center:{x:298.7,y:276.2}},{label:11,center:{x:213.9,y:204}},{label:12,center:{x:311.9,y:100}},{label:13,center:{x:286.8,y:69.6}},{label:14,center:{x:278.8,y:26.5}},{label:15,center:{x:371.5,y:76.2}}]} edges={[{source:1,target:0},{source:5,target:4},{source:4,target:3},{source:3,target:2},{source:2,target:1},{source:9,target:8},{source:8,target:7},{source:7,target:6},{source:6,target:1},{source:6,target:10},{source:6,target:11},{source:11,target:12},{source:12,target:13},{source:13,target:14},{source:12,target:15}]} />`),
  // Apus
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:4,center:{x:65.6,y:198.5}},{label:0,center:{x:137.7,y:262.9}},{label:1,center:{x:87.4,y:278.8}},{label:2,center:{x:333.8,y:318.6}}]} edges={[{source:3,target:2},{source:2,target:0},{source:0,target:1}]} />`),
  // Aquarius
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:4,center:{x:78.9,y:191.8}},{label:0,center:{x:133.8,y:194.7}},{label:1,center:{x:69.5,y:227.8}},{label:2,center:{x:33.1,y:284.8}},{label:3,center:{x:25.8,y:305.3}},{label:5,center:{x:27.2,y:343.7}},{label:6,center:{x:78.1,y:374.8}},{label:7,center:{x:134.4,y:383.5}},{label:8,center:{x:169.5,y:268.2}},{label:9,center:{x:162.3,y:319.9}},{label:10,center:{x:171.5,y:151.7}},{label:11,center:{x:207.3,y:119.2}},{label:12,center:{x:250.3,y:98}},{label:13,center:{x:306.6,y:132.5}},{label:14,center:{x:349.7,y:187.4}},{label:15,center:{x:400.7,y:167.6}},{label:16,center:{x:224.5,y:188.8}},{label:17,center:{x:268.2,y:237.8}},{label:18,center:{x:175.5,y:81.5}},{label:19,center:{x:129.8,y:82.1}},{label:20,center:{x:201.3,y:48.4}}]} edges={[{source:3,target:2},{source:2,target:0},{source:0,target:1},{source:4,target:3},{source:4,target:5},{source:5,target:6},{source:6,target:7},{source:9,target:7},{source:1,target:8},{source:8,target:9},{source:1,target:10},{source:11,target:10},{source:11,target:18},{source:18,target:19},{source:20,target:18},{source:16,target:17},{source:11,target:12},{source:12,target:13},{source:12,target:16},{source:13,target:14},{source:14,target:15}]} />`),
  // Ara
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:0,center:{x:169.4,y:55.3}},{label:1,center:{x:47.5,y:65.5}},{label:2,center:{x:203.9,y:218.4}},{label:4,center:{x:201.6,y:247.3}},{label:5,center:{x:156.2,y:357}},{label:3,center:{x:357,y:347}},{label:6,center:{x:313.9,y:217.2}},{label:7,center:{x:327.8,y:133.1}}]} edges={[{source:1,target:0},{source:0,target:2},{source:2,target:3},{source:3,target:4},{source:4,target:5},{source:5,target:6},{source:6,target:7},{source:7,target:0}]} />`),
  //Camelopardalis
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:0,center:{x:88,y:179.1}},{label:2,center:{x:193.3,y:205.2}},{label:4,center:{x:192.4,y:291.7}},{label:5,center:{x:221.1,y:376.2}},{label:3,center:{x:360.9,y:194.1}},{label:6,center:{x:294,y:162.9}},{label:7,center:{x:235.1,y:111.9}},{label:1,center:{x:43.7,y:74.9}}]} edges={[{source:0,target:1},{source:7,target:0},{source:1,target:2},{source:2,target:3},{source:6,target:1},{source:6,target:5},{source:5,target:4}]} />`),
  //Cancer
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:0,center:{x:195.9,y:154.6}},{label:2,center:{x:180.1,y:223.7}},{label:5,center:{x:320.4,y:354.4}},{label:3,center:{x:199.3,y:321.2}},{label:6,center:{x:225.8,y:200}},{label:7,center:{x:274.2,y:307.3}},{label:1,center:{x:169.5,y:47}},{label:4,center:{x:112.6,y:308}},{label:8,center:{x:368.9,y:239.1}}]} edges={[{source:7,target:1},{source:1,target:0},{source:0,target:6},{source:1,target:5},{source:5,target:2}]} />`),
  //Capricornus
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:0,center:{x:82,y:192.4}},{label:2,center:{x:150.9,y:203.2}},{label:5,center:{x:267.4,y:349.1}},{label:3,center:{x:213.9,y:366.9}},{label:6,center:{x:237.1,y:200.7}},{label:7,center:{x:372.2,y:125.8}},{label:1,center:{x:40.4,y:190.1}},{label:4,center:{x:100,y:279.5}},{label:8,center:{x:357,y:174.2}},{label:9,center:{x:333.8,y:227.8}}]} edges={[{source:5,target:8},{source:8,target:9},{source:9,target:2},{source:2,target:3},{source:3,target:7},{source:7,target:6},{source:6,target:0},{source:0,target:1},{source:1,target:4},{source:4,target:8}]} />`),
  // Carina
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:0,center:{x:239.4,y:282}},{label:1,center:{x:320.4,y:68.4}},{label:2,center:{x:148.5,y:264.5}},{label:3,center:{x:127.7,y:173.8}},{label:4,center:{x:181.5,y:97}},{label:5,center:{x:278.6,y:172}},{label:6,center:{x:376.8,y:170.2}}]} edges={[{source:0,target:2},{source:0,target:4},{source:0,target:5},{source:1,target:4},{source:1,target:5},{source:2,target:3},{source:2,target:4},{source:4,target:5}]} />`),
  // Cassiopeia
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:0,center:{x:239.4,y:282}},{label:1,center:{x:320.4,y:68.4}},{label:2,center:{x:148.5,y:264.5}},{label:3,center:{x:127.7,y:173.8}},{label:4,center:{x:181.5,y:97}},{label:5,center:{x:278.6,y:172}},{label:6,center:{x:376.8,y:170.2}}]} edges={[{source:0,target:2},{source:0,target:4},{source:0,target:5},{source:1,target:4},{source:1,target:5},{source:2,target:3},{source:2,target:4},{source:4,target:5}]} />`),
  // Cepheus
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:0,center:{x:91.7,y:195.9}},{label:2,center:{x:231.3,y:300.9}},{label:4,center:{x:183.5,y:129.5}},{label:6,center:{x:328.5,y:225.8}},{label:7,center:{x:162.9,y:341.1}},{label:8,center:{x:100,y:112.6}},{label:11,center:{x:66.2,y:65.6}},{label:12,center:{x:249,y:242.4}},{label:1,center:{x:353,y:188.8}},{label:3,center:{x:129.8,y:301.3}},{label:9,center:{x:178.1,y:304}},{label:5,center:{x:149.7,y:219.9}},{label:10,center:{x:190.1,y:247}}]} edges={[{source:6,target:0},{source:0,target:2},{source:2,target:6},{source:0,target:9},{source:9,target:10},{source:10,target:4},{source:4,target:1},{source:1,target:7},{source:7,target:2},{source:7,target:3},{source:3,target:8}]} />`),
  // Cetus
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:0,center:{x:31.4,y:119.7}},{label:2,center:{x:185.6,y:247.9}},{label:4,center:{x:143.7,y:75.8}},{label:6,center:{x:345,y:336.4}},{label:7,center:{x:170.2,y:370.2}},{label:8,center:{x:88.1,y:51}},{label:11,center:{x:43,y:67.6}},{label:12,center:{x:153.6,y:185.5}},{label:1,center:{x:388.1,y:249}},{label:3,center:{x:307.3,y:247}},{label:9,center:{x:198.7,y:310}},{label:5,center:{x:95.4,y:126.5}},{label:10,center:{x:109.9,y:160.3}},{label:13,center:{x:259.6,y:211.9}}]} edges={[{source:0,target:6},{source:6,target:5},{source:5,target:2},{source:2,target:11},{source:11,target:0},{source:11,target:12},{source:12,target:7},{source:7,target:1},{source:1,target:10},{source:10,target:4},{source:10,target:3},{source:8,target:3},{source:9,target:8},{source:1,target:13},{source:13,target:9}]} />`),
  // Chamaeleon
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:0,center:{x:160.6,y:292.6}},{label:4,center:{x:25.9,y:259.9}},{label:11,center:{x:374.2,y:260.9}},{label:12,center:{x:174.8,y:210.6}},{label:10,center:{x:37.1,y:213.3}},{label:13,center:{x:391.4,y:235.8}}]} edges={[{source:5,target:2},{source:2,target:0},{source:0,target:1},{source:1,target:4},{source:4,target:3},{source:3,target:5}]} />`),
  // Corona Borealis
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:0,center:{x:314.2,y:261.5}},{label:4,center:{x:251,y:297}},{label:11,center:{x:350.3,y:162.3}},{label:12,center:{x:98,y:291.4}},{label:10,center:{x:174.2,y:321.9}},{label:13,center:{x:44.4,y:160.3}},{label:1,center:{x:272.2,y:76.8}}]} edges={[{source:2,target:0},{source:0,target:1},{source:1,target:4},{source:4,target:3},{source:3,target:5},{source:2,target:6}]} />`),
  // Corvus
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:0,center:{x:267.2,y:98.5}},{label:4,center:{x:308.6,y:270.5}},{label:11,center:{x:143,y:64.3}},{label:12,center:{x:110.6,y:299.4}},{label:10,center:{x:320.5,y:354.3}}]} edges={[{source:2,target:0},{source:0,target:1},{source:1,target:4},{source:2,target:3},{source:3,target:1}]} />`),
  // Crater
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:0,center:{x:222.2,y:99.2}},{label:4,center:{x:261,y:186.4}},{label:11,center:{x:152.3,y:61.6}},{label:12,center:{x:221.2,y:260.3}},{label:10,center:{x:376.2,y:262.9}},{label:1,center:{x:306,y:376.2}},{label:2,center:{x:98.7,y:282.8}},{label:3,center:{x:43,y:250.4}}]} edges={[{source:2,target:0},{source:0,target:1},{source:1,target:4},{source:3,target:1},{source:7,target:6},{source:6,target:3},{source:5,target:3},{source:4,target:5}]} />`),
  // Cygnus
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:0,center:{x:277.8,y:74.7}},{label:4,center:{x:198,y:137.4}},{label:11,center:{x:311.3,y:35.1}},{label:12,center:{x:144.4,y:167.6}},{label:10,center:{x:265.6,y:153.7}},{label:1,center:{x:192.7,y:220.6}},{label:2,center:{x:96,y:219.2}},{label:3,center:{x:37.1,y:327.2}},{label:5,center:{x:121.9,y:291.4}},{label:6,center:{x:271.5,y:288.8}},{label:7,center:{x:352.3,y:353.7}},{label:8,center:{x:220.5,y:148.4}},{label:9,center:{x:190.7,y:82.8}},{label:13,center:{x:86.1,y:165.6}},{label:14,center:{x:40.4,y:210.6}},{label:15,center:{x:39.7,y:241.1}}]} edges={[{source:2,target:0},{source:0,target:1},{source:3,target:1},{source:7,target:6},{source:6,target:3},{source:7,target:8},{source:8,target:5},{source:5,target:4},{source:4,target:0},{source:5,target:9},{source:9,target:10},{source:3,target:5}]} />`),
  // Dorado
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:0,center:{x:350.6,y:48.9}},{label:4,center:{x:277.5,y:121.5}},{label:12,center:{x:156.3,y:180.2}},{label:2,center:{x:69.5,y:378.8}},{label:3,center:{x:37.1,y:335.1}},{label:5,center:{x:92.1,y:302}}]} edges={[{source:3,target:5},{source:5,target:4},{source:4,target:3},{source:5,target:2},{source:2,target:1},{source:1,target:5},{source:0,target:1}]} />`),
  // Gemini
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:0,center:{x:109.6,y:142.2}},{label:4,center:{x:154.3,y:167.9}},{label:12,center:{x:36.4,y:225.2}},{label:2,center:{x:119.2,y:215.3}},{label:3,center:{x:62.3,y:289.4}},{label:5,center:{x:76.2,y:244.4}},{label:1,center:{x:281.5,y:400.7}},{label:6,center:{x:170.2,y:363.6}},{label:7,center:{x:302.6,y:337.8}},{label:8,center:{x:215.9,y:310.6}},{label:9,center:{x:147.7,y:304}},{label:10,center:{x:80.1,y:143.1}},{label:11,center:{x:190.1,y:113.3}},{label:13,center:{x:250.3,y:219.2}},{label:14,center:{x:307.9,y:266.9}},{label:15,center:{x:323.8,y:229.2}},{label:16,center:{x:355,y:224.5}},{label:17,center:{x:381.5,y:208}},{label:18,center:{x:336.4,y:179.5}}]} edges={[{source:6,target:7},{source:7,target:10},{source:10,target:9},{source:9,target:8},{source:5,target:2},{source:4,target:5},{source:5,target:3},{source:5,target:10},{source:11,target:0},{source:0,target:1},{source:1,target:3},{source:12,target:1},{source:13,target:14},{source:1,target:13},{source:13,target:15},{source:15,target:16},{source:16,target:17}]} />`),
  // Hercules
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:0,center:{x:64.5,y:172.7}},{label:4,center:{x:137.8,y:181.1}},{label:12,center:{x:32.5,y:287.4}},{label:2,center:{x:177.5,y:189.4}},{label:3,center:{x:91.4,y:282.8}},{label:5,center:{x:59.6,y:272.2}},{label:1,center:{x:314.6,y:349}},{label:6,center:{x:126.5,y:300}},{label:7,center:{x:285.4,y:321.2}},{label:8,center:{x:202.6,y:250.4}},{label:9,center:{x:166.9,y:310.6}},{label:10,center:{x:105.3,y:74.2}},{label:11,center:{x:155.6,y:113.3}},{label:13,center:{x:236.4,y:168.2}},{label:14,center:{x:243.7,y:242.4}},{label:15,center:{x:366.2,y:123.2}},{label:16,center:{x:326.5,y:96.7}},{label:17,center:{x:289.4,y:76.2}},{label:18,center:{x:260.9,y:120.6}},{label:19,center:{x:317.9,y:389.4}},{label:20,center:{x:366.9,y:308}},{label:21,center:{x:190.1,y:388.8}}]} edges={[{source:3,target:13},{source:13,target:14},{source:14,target:9},{source:3,target:9},{source:13,target:18},{source:18,target:17},{source:16,target:17},{source:16,target:15},{source:3,target:1},{source:1,target:0},{source:0,target:11},{source:9,target:10},{source:10,target:7},{source:7,target:4},{source:4,target:5},{source:5,target:2},{source:19,target:6},{source:6,target:8},{source:8,target:14}]} />`),
  // Lacerta
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:12,center:{x:258.3,y:384.8}},{label:3,center:{x:200,y:258.3}},{label:5,center:{x:279.5,y:337.8}},{label:7,center:{x:149,y:225.2}},{label:10,center:{x:217.9,y:107.3}},{label:11,center:{x:173.5,y:82.8}},{label:13,center:{x:232.5,y:168.2}},{label:17,center:{x:175.5,y:145.1}},{label:18,center:{x:209.3,y:37.8}}]} edges={[{source:8,target:5},{source:5,target:4},{source:4,target:7},{source:7,target:6},{source:6,target:3},{source:3,target:1},{source:1,target:2},{source:2,target:0}]} />`),
  // Lepus
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:3,center:{x:130.5,y:322.5}},{label:7,center:{x:185.4,y:354.3}},{label:10,center:{x:156.3,y:182.1}},{label:11,center:{x:100.7,y:176.2}},{label:13,center:{x:264.2,y:308}},{label:17,center:{x:231.8,y:225.8}},{label:18,center:{x:46.4,y:200.7}},{label:0,center:{x:383.4,y:321.2}},{label:1,center:{x:347,y:182.8}},{label:2,center:{x:306,y:115.3}},{label:4,center:{x:351,y:104}}]} edges={[{source:6,target:3},{source:3,target:2},{source:2,target:5},{source:5,target:4},{source:4,target:1},{source:1,target:0},{source:0,target:6},{source:0,target:5},{source:10,target:8},{source:8,target:9},{source:7,target:8},{source:7,target:4},{source:5,target:8}]} />`),
  // Libra
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:3,center:{x:153,y:300.7}},{label:7,center:{x:143,y:343.1}},{label:10,center:{x:151,y:114.6}},{label:11,center:{x:304,y:142.4}},{label:0,center:{x:266.2,y:270.2}},{label:1,center:{x:220.5,y:34.5}}]} edges={[{source:5,target:2},{source:2,target:3},{source:3,target:5},{source:4,target:3},{source:2,target:0},{source:0,target:1}]} />`),
  // Lupus
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:3,center:{x:202.6,y:363.6}},{label:7,center:{x:190.7,y:239.8}},{label:10,center:{x:54.3,y:147.7}},{label:11,center:{x:158.9,y:94.1}},{label:1,center:{x:79.5,y:68.2}},{label:0,center:{x:147,y:178.2}},{label:2,center:{x:206,y:165.6}},{label:4,center:{x:261.6,y:206.6}},{label:5,center:{x:301.3,y:278.2}},{label:6,center:{x:248.3,y:273.5}},{label:9,center:{x:360.3,y:263.6}}]} edges={[{source:4,target:2},{source:2,target:3},{source:3,target:4},{source:2,target:0},{source:0,target:1},{source:1,target:5},{source:5,target:2},{source:8,target:0},{source:5,target:6},{source:6,target:7}]} />`),
  // Lyra
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:3,center:{x:203.3,y:319.2}},{label:7,center:{x:125.2,y:341.1}},{label:10,center:{x:263.6,y:140.4}},{label:11,center:{x:310.6,y:98}},{label:1,center:{x:257.6,y:76.2}},{label:0,center:{x:188.7,y:168.9}},{label:2,center:{x:158.9,y:357.6}},{label:4,center:{x:105.3,y:377.5}},{label:9,center:{x:384.8,y:93.4}},{label:5,center:{x:80.8,y:85.5}},{label:6,center:{x:54.3,y:122.5}}]} edges={[{source:4,target:2},{source:2,target:3},{source:3,target:4},{source:2,target:0},{source:0,target:1},{source:1,target:5},{source:5,target:2}]} />`),
  // Orion
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:3,center:{x:201.3,y:253.7}},{label:7,center:{x:169.5,y:256.3}},{label:10,center:{x:229.8,y:241.7}},{label:11,center:{x:218.5,y:150.4}},{label:1,center:{x:171.5,y:123.2}},{label:0,center:{x:133.8,y:172.2}},{label:2,center:{x:153,y:370.2}},{label:4,center:{x:268.9,y:344.4}},{label:9,center:{x:353.6,y:141.1}},{label:5,center:{x:58.9,y:95.4}},{label:6,center:{x:94,y:153.7}},{label:8,center:{x:85.4,y:79.5}},{label:12,center:{x:67.5,y:25.8}},{label:14,center:{x:101.3,y:25.8}},{label:13,center:{x:258.9,y:274.9}},{label:15,center:{x:356.3,y:172.9}},{label:16,center:{x:341.7,y:222.5}},{label:17,center:{x:321.9,y:245.1}},{label:18,center:{x:347.7,y:104}},{label:20,center:{x:353.6,y:28.5}},{label:19,center:{x:328.5,y:41.7}},{label:21,center:{x:319.2,y:101.3}},{label:22,center:{x:187.4,y:289.4}},{label:23,center:{x:205.3,y:323.9}},{label:24,center:{x:233.1,y:327.2}}]} edges={[{source:3,target:4},{source:0,target:1},{source:1,target:5},{source:4,target:5},{source:0,target:2},{source:2,target:3},{source:13,target:11},{source:12,target:9},{source:9,target:10},{source:11,target:10},{source:5,target:10},{source:2,target:14},{source:14,target:7},{source:7,target:6},{source:1,target:6},{source:3,target:8},{source:8,target:15},{source:17,target:16},{source:16,target:15},{source:18,target:8},{source:20,target:18},{source:20,target:19}]} />`),
  // Phoenix
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:3,center:{x:230.5,y:151}},{label:10,center:{x:339.7,y:222.5}},{label:11,center:{x:162.3,y:162.3}},{label:2,center:{x:376.2,y:178.2}},{label:4,center:{x:233.1,y:205.3}},{label:9,center:{x:272.2,y:120.6}},{label:5,center:{x:29.1,y:148.4}},{label:6,center:{x:75.5,y:180.2}},{label:8,center:{x:85.4,y:106}},{label:14,center:{x:132.5,y:134.4}},{label:13,center:{x:209.3,y:322.5}},{label:16,center:{x:313.9,y:147}},{label:20,center:{x:388.7,y:119.2}},{label:22,center:{x:162.3,y:287.4}},{label:0,center:{x:274.2,y:79.5}}]} edges={[{source:7,target:6},{source:8,target:7},{source:8,target:9},{source:9,target:2},{source:2,target:13},{source:13,target:10},{source:14,target:2},{source:5,target:14},{source:11,target:5},{source:11,target:10},{source:3,target:1},{source:12,target:11},{source:12,target:3}]} />`),
  // Scorpius
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:10,center:{x:245,y:141.1}},{label:11,center:{x:65.6,y:376.8}},{label:2,center:{x:227.2,y:167.6}},{label:9,center:{x:180.8,y:368.9}},{label:5,center:{x:95.4,y:276.8}},{label:6,center:{x:64.2,y:273.5}},{label:8,center:{x:45.7,y:301.3}},{label:14,center:{x:31.1,y:332.5}},{label:16,center:{x:186.8,y:289.4}},{label:20,center:{x:192.1,y:246.4}},{label:0,center:{x:127.2,y:384.8}},{label:1,center:{x:277.5,y:129.2}},{label:3,center:{x:348.3,y:104.7}},{label:4,center:{x:336.4,y:57.6}},{label:7,center:{x:308.6,y:44.4}},{label:12,center:{x:353,y:143.1}},{label:13,center:{x:352.3,y:182.8}},{label:15,center:{x:368.2,y:35.1}},{label:17,center:{x:25.8,y:248.3}},{label:18,center:{x:49,y:206.6}},{label:19,center:{x:272.2,y:170.9}},{label:21,center:{x:274.2,y:90.7}}]} edges={[{source:5,target:4},{source:6,target:5},{source:6,target:7},{source:7,target:1},{source:10,target:1},{source:3,target:10},{source:8,target:3},{source:2,target:0},{source:9,target:8},{source:9,target:2},{source:0,target:11},{source:11,target:12},{source:12,target:13},{source:13,target:14},{source:12,target:15},{source:15,target:16}]} />`),
  // Taurus
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:10,center:{x:25.8,y:169.5}},{label:11,center:{x:200,y:216.6}},{label:9,center:{x:164.9,y:223.2}},{label:5,center:{x:38.4,y:60.9}},{label:6,center:{x:124.5,y:123.2}},{label:8,center:{x:160.3,y:158.3}},{label:14,center:{x:183.4,y:185.4}},{label:1,center:{x:286.8,y:368.9}},{label:12,center:{x:229.1,y:323.9}},{label:13,center:{x:273.5,y:268.9}},{label:0,center:{x:131.1,y:217.2}},{label:2,center:{x:367.5,y:225.8}},{label:3,center:{x:376.8,y:282.8}},{label:4,center:{x:396,y:311.3}}]} edges={[{source:4,target:3},{source:5,target:4},{source:5,target:6},{source:6,target:1},{source:8,target:9},{source:10,target:0},{source:10,target:2},{source:2,target:1},{source:1,target:9},{source:9,target:11},{source:11,target:12},{source:12,target:13},{source:7,target:8}]} />`),
  // Ursa Major
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:10,center:{x:312.6,y:208.6}},{label:11,center:{x:154.3,y:208.6}},{label:9,center:{x:221.2,y:185.5}},{label:5,center:{x:25.8,y:180.2}},{label:6,center:{x:62.3,y:158.3}},{label:8,center:{x:102.6,y:158.3}},{label:14,center:{x:135.1,y:172.2}},{label:1,center:{x:221.2,y:397.4}},{label:12,center:{x:196.7,y:378.8}},{label:13,center:{x:166.9,y:276.2}},{label:0,center:{x:211.3,y:136.4}},{label:2,center:{x:225.8,y:310.6}},{label:3,center:{x:292.7,y:329.2}},{label:4,center:{x:302.6,y:306.6}},{label:7,center:{x:280.8,y:164.9}},{label:15,center:{x:290.7,y:113.9}},{label:16,center:{x:363.6,y:110}},{label:17,center:{x:361.6,y:241.1}},{label:18,center:{x:377.5,y:219.9}}]} edges={[{source:4,target:3},{source:5,target:4},{source:5,target:6},{source:6,target:1},{source:8,target:9},{source:10,target:2},{source:2,target:1},{source:1,target:9},{source:9,target:11},{source:11,target:12},{source:12,target:13},{source:7,target:8},{source:10,target:6},{source:10,target:15},{source:15,target:14},{source:14,target:2},{source:15,target:16},{source:16,target:14},{source:14,target:0},{source:0,target:17},{source:17,target:18}]} />`),
  // Virgo
  processRawConstellation(`<Graph indexType="custom" height="400" width="400" nodes={[{label:11,center:{x:31.1,y:268.9}},{label:5,center:{x:25.8,y:180.2}},{label:6,center:{x:80.1,y:182.8}},{label:8,center:{x:133.8,y:213.9}},{label:14,center:{x:89.4,y:248.3}},{label:1,center:{x:162.9,y:331.1}},{label:12,center:{x:180.8,y:268.2}},{label:13,center:{x:235.8,y:210}},{label:2,center:{x:204,y:161.6}},{label:3,center:{x:188.7,y:73.5}},{label:7,center:{x:306,y:200}},{label:15,center:{x:323.2,y:115.9}},{label:16,center:{x:370.9,y:148.4}},{label:0,center:{x:359.6,y:190.7}}]} edges={[{source:2,target:1},{source:3,target:2},{source:3,target:4},{source:4,target:0},{source:6,target:7},{source:7,target:8},{source:8,target:9},{source:5,target:6},{source:11,target:10},{source:11,target:12},{source:10,target:13},{source:13,target:12},{source:10,target:7},{source:7,target:3}]} />`)
]

const locatedConstellations = constellations.map( cons => {
  return {...cons, top: Math.floor(Math.random() * (SPACE_HEIGHT - 500))+100, left: Math.floor(Math.random() * (SPACE_WIDTH-500)+100)}
})

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
        {locatedConstellations.map( cons => < Constellation {...cons} />)}

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
