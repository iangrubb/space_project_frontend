import React, { Component } from 'react';
import styled from 'styled-components'

const Container = styled.div`

    z-index: 2;

    left 6vw;
    top: -2vw;

    position: fixed;
    width: 23vw;
    height: 11vw;

    background: linear-gradient(48deg, rgba(188,183,200,1) 6%, rgba(123,118,133,1) 15%, rgba(178,172,187,1) 23%, rgba(132,126,143,1) 30%, rgba(176,170,188,1) 37%, rgba(113,108,121,1) 43%, rgba(166,163,171,1) 48%, rgba(128,123,138,1) 52%, rgba(111,103,127,1) 60%, rgba(177,173,187,1) 70%, rgba(149,143,162,1) 77%, rgba(102,97,110,1) 83%, rgba(114,110,122,1) 89%, rgba(171,166,180,1) 95%);

    border: 0.1vw solid black;
    border-radius: 2vw;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    font-family: Orbitron, sans-serif;
    font-size: 1.2vw;
`

const NameDisplay = styled.div`
    width: 80%;
    height: 25%;

    border: .2vw double #eeeeee;

    margin: 1vw;

    border-radius: 0.4vw;
    box-shadow: 0 0 1vw white;

    background: #333333;
    color: #eeeeee;

    display: flex;
    align-items: center;
    justify-content: center;

`

const Button = styled.div`

color: #eeeeee;
background: #333333;

font-family: Orbitron, sans-serif;
font-size: 0.8vw;

margin: 0;
padding 1vh .5vw;

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

export class UserInfo extends Component {
    render() {
        return (
            <Container>

            <NameDisplay><h2 style={{margin: '0'}}>{this.props.username}</h2></NameDisplay>

            <div style={{display: 'flex', justifyContent:'space-evenly', width: '80%', margin: '0 1vw 1vw 1vw'}}>
                <Button onClick={this.props.toggleFavorites}>Favorites</Button>
                <Button onClick={this.props.center}>Center</Button>
                <Button onClick={this.props.logOut}>Log Out</Button>

            </div>
                    
                
            </Container>
        );
    }
}

export default UserInfo;
