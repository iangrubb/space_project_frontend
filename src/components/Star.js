import React, { Component } from 'react';

export class Star extends Component {


    state = {diameter: this.props.diameter, color: this.props.color}

    componentDidMount(){
        
        if (Math.random() > .9) {
            const start = Math.random() * 10000
            const period = Math.random() * 10000 + 10000
            setTimeout(()=>{
                setInterval(()=>this.setState({diameter: this.state.diameter + 1}), period)
                setInterval(()=>this.setState({diameter: this.props.diameter}) , period + 100)
            }, start)
            
        }
    }


    render() {

        const starStyle = {
            position:'absolute',
            height: `${this.state.diameter}px`,
            width: `${this.state.diameter}px`,
            top: `${this.props.top}px`,
            left: `${this.props.left}px`,
            background: `${this.state.color}`,
            borderRadius: '50%',
            boxShadow: '0 0 4px white',
        }

        return (
            <div style={starStyle}>
                
            </div>
        );
    }

    
}

export default Star;
