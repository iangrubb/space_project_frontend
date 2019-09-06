import React, { Component } from 'react';
import Star from './Star'

const SPACE_WIDTH = 3000
const SPACE_HEIGHT = 3000


export class Space extends Component {

    state = {starShift: 0}

    stars = [...Array(1000).keys()].map( num => {

        const left = Math.floor(SPACE_WIDTH * Math.random())
        const top = Math.floor(SPACE_HEIGHT * Math.random())
        const diameter = Math.floor(Math.random() * 3) + 2
        const color = `hsl(0, 0%, ${Math.floor(Math.random() * 25 + 55)}%)`
        
        return {left: left, top: top, diameter: diameter, color: color}
    })

    componentDidMount (){
        setInterval(() => {
            this.setState({starShift: this.state.starShift + 1})
        }, 250)
    }



    render() {

        // can used on a div to prevent scroll
        const prevent = {
            position: 'fixed', 
            height: '100vh', 
            width: '100vw', 
            background: 'hsla(100, 80%, 80%, 0%)'
        }

        return (
            <div style={this.spaceStyle}>
                
                {this.stars.map( (star, index) => <Star key={index} {...star} shift={this.state.starShift}  />)}
                
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
