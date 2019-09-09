import React, { Component } from 'react';

export class Star extends Component {


    state = {diameter: this.props.diameter, color: this.props.color}

    componentDidMount(){

        if (Math.random() > .9) {
            const period = Math.random() * 50000 + 10000
            setInterval(()=>this.setState({diameter: this.state.diameter + 2}), period)
            setInterval(()=>this.setState({diameter: this.props.diameter}) , period + 50)
        }

    }


    render() {

        const starStyle = {
            position:'absolute',
            height: `${this.state.diameter}px`,
            width: `${this.state.diameter}px`,
            top: `${this.props.top}px`,
            left: `${(this.props.left + this.props.shift) % this.props.pageWidth }px`,
            background: `${this.state.color}`,
            borderRadius: '50%',
            boxShadow: '0 0 4px white',
        }

        return (
            <div className={this.props.className} style={starStyle}>
                
            </div>
        );
    }

    
}

export default Star;
