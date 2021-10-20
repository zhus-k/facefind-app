import React from 'react'
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import logo from './logo.png';

const Logo = () => {
    return (
        <div className='ma4 mt3'>
            <Tilt className='br shadow-2 logo-space pa3 isBlurred'>
                <img style={{paddingLeft:'20px'}} src={ logo } alt='logo'/>
            </Tilt>
        </div>
    );
}

export default Logo;