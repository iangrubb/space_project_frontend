import React, { Component } from 'react';
import Star from './Star'
import LineSet from './LineSet'

export class Constellation extends Component {


    // Props:  top, left, stars, lines
    

    render() {
        return (
            
            <div>
                {this.props.stars.map(star => <Star
                    className={`${star.star_id}`}
                    key={star.star_id}
                    diameter={8}
                    color={'hsl(0, 0%,100%)'}
                    shift={0}
                    left={this.props.left + star.x}
                    top={this.props.top + star.y}
                />)}
                <LineSet lines={this.props.lines} top={this.props.top} left={this.props.left} height={400} width={400} />
            </div>
            )}
                
            
}
    


export default Constellation;
