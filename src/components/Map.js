import React, { Component } from 'react';
import styled from 'styled-components'

const Container = styled.div`

    right: 6vw;
    top: -20.5vw;

    transform: translateY(${props => props.show ? '19vw' : '0'});
    transition: transform 0.6s;
    

    position: fixed;
    width: 20vw;
    height: 24vw;

    background: linear-gradient(48deg, rgba(188,183,200,1) 6%, rgba(123,118,133,1) 15%, rgba(178,172,187,1) 23%, rgba(132,126,143,1) 30%, rgba(176,170,188,1) 37%, rgba(113,108,121,1) 43%, rgba(166,163,171,1) 48%, rgba(128,123,138,1) 52%, rgba(111,103,127,1) 60%, rgba(177,173,187,1) 70%, rgba(149,143,162,1) 77%, rgba(102,97,110,1) 83%, rgba(114,110,122,1) 89%, rgba(171,166,180,1) 95%);

    border: 0.1vw solid black;
    border-radius: 2vw;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    
`

const Monitor = styled.div`

    width: 300px;
    height: 300px;

    border: .2vw double #eeeeee;

    border-radius: 0.4vw;
    box-shadow: 0 0 1vw white;

    background: #222222;
    
`

const MapButton = styled.div`

    color: #eeeeee;
    background: #333333;

    font-family: Orbitron, sans-serif;
    font-size: 1.4vw;

    width: 40%;
    height: 6%;

    margin: 1vh 0;
    padding 1vh 0;

    border: solid #333333 .1vw;
    border-radius: .4vw;

    box-shadow: 0.1vw 0.2vw 0.1vw #222222;
    transform: translateY(-.2vh);

    :hover {
        background: #444444;
    }

    :active {
        transform: translateY(-0.1vh);
        box-shadow: 0.02vw 0.04vw 0 #222222;
    }    
`

const Dot= styled.div`

    background: ${props => props.color};

    transform: translate(${props => Math.floor(props.left/ 20)}px , ${props => Math.floor(props.top/ 20)}px);

    position:absolute;
    

    height: 6px;
    width: 6px;
    
    border-radius: 50%;

`

const Box= styled.div`

    background: hsla( 240, 60%, 60%, .3);
    height: ${props => Math.floor(props.height/ 20)}px;
    width: ${props => Math.floor(props.width/ 20)}px;
    transform: translate(${props => Math.floor(props.left/ 20)}px , ${props => Math.floor(props.top/ 20)}px);

`

export class Map extends Component {

    

    render() {
        return (
            <Container show={this.props.show}>
                <Monitor>
                    {this.props.planets.map(planet => {
                        return <Dot color={planet.name === "Sun" ? "yellow": "green"} top={2800 + (planet.distance * -Math.sin(planet.rotation))} left={2800 + (planet.distance * Math.cos(planet.rotation))} ></Dot>
                    })}

                    {this.props.constellations.map(cons => <Dot color={"white"} top={2800 + (cons.distance * -Math.sin(cons.rotation))} left={2800 + (cons.distance * Math.cos(cons.rotation))} ></Dot> )}

                    <Box top={this.props.scrollTop} left={this.props.scrollLeft} height={this.props.windowTop} width={this.props.windowLeft}></Box>


                </Monitor>
                <MapButton onClick={this.props.toggleMap}>
                    <h3 style={{margin: '0'}}>Map</h3>
                </MapButton>
            </Container>            
        );
    }
}

export default Map;
