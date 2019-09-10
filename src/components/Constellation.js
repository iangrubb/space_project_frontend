import React, { Component } from 'react';
import Star from './Star'
import LineSet from './LineSet'

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


    // Props:  top, left, stars, lines
    

    render() {
        return (
             
            <Positioned distance={this.props.distance} offset={this.props.rotation * (360/Math.PI)} >
                {this.props.stars.map(star => <Star
                    key={star.star_id}
                    diameter={8}
                    color={'hsl(0, 0%,100%)'}
                    shift={0}
                    pageWidth={6000}
                    left={star.x}
                    top={star.y}
                />)}
                <LineSet lines={this.props.lines} top={0} left={0} height={400} width={400} />
            </Positioned>
            )}
                
            
}
    


export default Constellation;
