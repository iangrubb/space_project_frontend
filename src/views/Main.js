import React, { Component } from 'react';
import Space from '../components/Space'
import Map from '../components/Map'
import UserInfo from '../components/UserInfo'

export class Main extends Component {

    state = {
        scrollTop: 0,
        scrollLeft: 0,
        mapShow: false,
    }

    constructor(props) {
        super(props)
        this.mainScreen = React.createRef();
    }

    center = () => {
        
        this.setState({scrollTop: 3000, scrollLeft: 3000,})
    }


    componentDidUpdate(prevProps, prevState) {
    if (prevState.scrollTop !== this.state.scrollTop || prevState.scrollLeft !== this.state.scrollLeft ) {
       
        console.log(this.mainScreen.current.scrollLeft)
        this.mainScreen.current.scrollLeft = this.state.scrollLeft
        this.mainScreen.current.scrollTop = this.state.scrollTop
    }}

    handleScroll = e => {
        this.setState({scrollTop: e.target.scrollTop, scrollLeft: e.target.scrollLeft})
    }

    toggleMap = () => {
        console.log(this.state.mapShow)
        this.setState({mapShow: !this.state.mapShow})
    }

    render() {

        
        return (
            <div ref={this.mainScreen} style={this.windowFrameStyle} onScroll={this.handleScroll} >
                
                

                <div style={this.windowStyle}>
                    <Space />
                </div> 

                < UserInfo username={"Ian"} center={this.center}/>
                < Map show={this.state.mapShow} toggleMap={this.toggleMap}/>
                

            </div>
        )
    }

    windowStyle = {
        
        position:'fixed',
        overflow: 'scroll',

        top: '1vh',
        left: '1vw',
        height: '97vh',
        width: '97vw',

        borderTop: '.5vh double #222222',
        borderBottom: '.5vh double #222222',
        borderLeft: '.5vw double #222222',
        borderRight: '.5vw double #222222',
        boxShadow: '0 0 1vw white',
        
        borderRadius: '100px',
    }

    windowFrameStyle={
        position: 'fixed',
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
        background: 'linear-gradient(48deg, rgba(188,183,200,1) 6%, rgba(123,118,133,1) 15%, rgba(178,172,187,1) 23%, rgba(132,126,143,1) 30%, rgba(176,170,188,1) 37%, rgba(113,108,121,1) 43%, rgba(166,163,171,1) 48%, rgba(128,123,138,1) 52%, rgba(111,103,127,1) 60%, rgba(177,173,187,1) 70%, rgba(149,143,162,1) 77%, rgba(102,97,110,1) 83%, rgba(114,110,122,1) 89%, rgba(171,166,180,1) 95%)',
    }
}

export default Main;
