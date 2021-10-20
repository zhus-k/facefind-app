import React from 'react'

const Navigation = ({ onRouteChange, isSignedIn }) => {
    return isSignedIn ?
        <nav className='navbar'>
            <p onClick={ () => onRouteChange('signout') } className='f3 link dim black pointer hoverline navbar-item'>Logout</p>
        </nav>
    :
        <nav className='navbar'>
            <p onClick={ () => onRouteChange('signin') } className='f3 link dim black pointer hoverline navbar-item'>Login</p>
            <p onClick={ () => onRouteChange('register') } className='f3 link dim black pointer hoverline navbar-item'>Register</p>
        </nav>
}

export default Navigation;