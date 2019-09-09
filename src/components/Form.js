import React, { Component } from 'react';
import styled from 'styled-components'

const Button = styled.div`

    background: #111111;
    color: #eeeeee;

    width: 48%;

    border: solid #333333 .1vw;
    
    border-radius: .4vw;
    padding: 1vh 0;

    margin: 2vh 0;

    box-shadow: 0.1vw 0.2vw 0.1vw #333333;
    transform: translateY(-0.3vh);

    :active {
        transform: translateY(-0.1vh);
        box-shadow: 0.02vw 0.04vw 0 #333333;
    }

`

const Input = styled.input`
    width: 80%;
    height: 5vh;
    font-size: 2vh;

    background: #cccccc;
    color: #333333;

    :focus {
        outline: none;
    }
`

export class Form extends Component {

    state={name: "", password: ""}

    render() {

        const containerStyle={

            position: 'relative',

            width: '26vw',
            height: '40vh',

            background: 'linear-gradient(48deg, rgba(188,183,200,1) 6%, rgba(123,118,133,1) 15%, rgba(178,172,187,1) 23%, rgba(132,126,143,1) 30%, rgba(176,170,188,1) 37%, rgba(113,108,121,1) 43%, rgba(166,163,171,1) 48%, rgba(128,123,138,1) 52%, rgba(111,103,127,1) 60%, rgba(177,173,187,1) 70%, rgba(149,143,162,1) 77%, rgba(102,97,110,1) 83%, rgba(114,110,122,1) 89%, rgba(171,166,180,1) 95%)',

            padding: '1vw',
            borderRadius: '1vw',

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            zIndex: '2',

        }

        const formStyle = {
            display:'flex',
            flexDirection: 'column',
            justifyContent: 'space-evently',
            alignItems: 'flex-start',

            background: '#eeeeee',
            
            width: '100%',
            height: '80%',
            
            padding: '2vw',

            margin: '0',

            border: 'solid #333333 .1vw',
            boxShadow: '0 0 1vw white',
            borderRadius: '.4vw',

        }

        return (
            
                <div style={containerStyle}>
                    <form style={formStyle}>
                        <h3>Username</h3>
                        <Input type="text"/>
                        <p>{this.props.nameError}</p>
                        <h3>Password</h3>
                        <Input type="text"/>
                        <p>{this.props.pwError}</p>
                        <Button>{this.props.message}</Button>
                    </form>
                </div>
        );
    }
}

export default Form;
