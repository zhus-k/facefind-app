import React from 'react'
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import logo from './logo.png';

const Logo = () => {
    return (
        <div className='ma4 mt0' style={{display: 'flex', justifyContent: 'flex-start'}}>
            <Tilt className='br shadow-2 logoback pa3 opacity'>
                <a href="https://www.vexels.com/png-svg/preview/129631/businessman-magnifying-head-icon"><img style={{paddingLeft:'20px'}} src={ logo } alt='logo'/></a>
            </Tilt>
        </div>
    );
}

export default Logo;