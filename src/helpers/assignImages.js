
import Mercury from '../images/Mercury.png'
import Venus from '../images/Venus.png'
import Earth from '../images/Earth.png'
import Mars from '../images/Mars.png'
import Pluto from '../images/Pluto.png'
import Neptune from '../images/Neptune.png'
import Uranus from '../images/Uranus.png'
import Saturn from '../images/Saturn.png'
import Jupiter from '../images/Jupiter.png'

import Sun from '../images/sun.png'


import Saturn2 from "../images/saturn2.png";
import Uranus2 from "../images/uranus2.png";
import Mars2 from "../images/mars2.png";

const randomPlanets = [
    Mars2,
    Saturn2,
    Uranus2
];


export default function assignPlanetImage (planetName) {

    switch(planetName) {
        case 'Sun':
            return {image: Sun, order: 0}
        case 'Mercury':
                return {image: Mercury, order: 1}
        case 'Venus':
                return {image: Venus, order: 2}
        case 'Earth':
                return {image: Earth, order: 3}
        case 'Mars':
                return {image: Mars, order: 4}
        case 'Jupiter':
                return {image: Jupiter, order: 5}
        case 'Saturn':
                return {image: Saturn, order: 6}
        case 'Uranus':
                return {image: Uranus, order: 7}
        case 'Neptune':
                return {image: Neptune, order: 8}
        case 'Pluto':
                return {image: Pluto, order: 9}
        default:
            return {image: randomPlanets[Math.floor(Math.random() * 3)], order: 10}
    }



}