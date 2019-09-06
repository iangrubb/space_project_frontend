import React, { Component } from 'react';

export class LineSet extends Component {
    render() {

        const svgStyle={
            position: 'absolute',
            top: `${this.props.top + 4}`,
            left: `${this.props.left + 4}`,
        }
        const lineStyle = {
            stroke: 'hsl(255,0%,100%)',
            strokeWidth: '1'
        }
        return (
            <svg width={this.props.width} height={this.props.height} style={svgStyle} >
                {this.props.lines.map( line => <line
                    x1={`${line.to.x}`}
                    y1={`${line.to.y}`}
                    x2={`${line.from.x}`}
                    y2={`${line.from.y}`}
                    style={lineStyle}
                />)}
            </svg>
        );
    }
}

export default LineSet;
