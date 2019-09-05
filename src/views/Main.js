import React, { Component } from 'react';
import Space from '../components/Space'

export class Main extends Component {


    render() {
        return (
            <div style={this.windowStyle}>
                <Space />
            </div>
        );
    }

    windowStyle = {
        position:'fixed',
        overflow: 'scroll',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
    }
}

export default Main;
