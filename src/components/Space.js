import React, { Component } from 'react';
import Star from './Star'

const SPACE_WIDTH = 3000
const SPACE_HEIGHT = 3000

const stars = [...Array(2000).keys()].map( num => {

    const left = Math.floor(SPACE_WIDTH * Math.random())
    const top = Math.floor(SPACE_HEIGHT * Math.random())
    const diameter = Math.floor(Math.random() * 3) + 2
    const color = `hsl(0, 0%, ${Math.floor(Math.random() * 25 + 55)}%)`
    
    return {left: left, top: top, diameter: diameter, color: color}
})

export class Space extends Component {



    render() {

        console.log(stars)
        return (
            <div style={this.spaceStyle}>
                {stars.map( (star, index) => <Star key={index} {...star}/>)}
            </div>
        );
    }

    spaceStyle = {
        width: `${SPACE_WIDTH}px`,
        height: `${SPACE_HEIGHT}px`,
        background: '#111111',
    }
}

export default Space;
