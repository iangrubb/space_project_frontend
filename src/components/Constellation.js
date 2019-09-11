import React, { Component } from 'react';
import Star from './Star'
import LineSet from './LineSet'
import Info from './Info'

import styled, { keyframes } from 'styled-components'



const Positioned = styled.div`
    position: absolute;
    top: ${3000-200}px;
    left: ${3000-200}px;
    width: 400px;
    height: 400px;

    transform: rotate(${props=> props.offset}deg) translateX(${props => props.distance}px) rotate(-${props => props.offset}deg);

`

export class Constellation extends Component {
 
    render() {
        return (
             
            <Positioned onClick={this.props.showHandler} distance={this.props.cons.distance} offset={this.props.cons.rotation * (180/Math.PI)} >
                {this.props.cons.image.stars.map(star => <Star
                    key={star.star_id}
                    diameter={8}
                    color={'hsl(0, 0%,100%)'}
                    shift={0}
                    pageWidth={6000}
                    left={star.x}
                    top={star.y}
                />)}
                <LineSet lines={this.props.cons.image.lines} top={0} left={0} height={400} width={400} />
                <Info
                    favoritePlanet={this.props.favoritePlanet}
                    planet={this.props.cons}
                    show={this.props.show}
                />
            </Positioned>
            
            )}
                
            
}
    


export default Constellation;
