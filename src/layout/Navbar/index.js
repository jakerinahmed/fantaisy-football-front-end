import React from 'react'
import { NavLink } from 'react-router-dom'

import './style.css'

const Navbar = () => {

    const activeClass = (({ isActive }) => isActive ? 'current' : 'nav-item')

    return (

        <div className='nav-div'>
            <h1>fant<span>AI</span>sy Football</h1>
            <nav>

                <NavLink className={activeClass} to="/" end>Home</NavLink>
                <NavLink className={activeClass} to='about'>About</NavLink>
                <NavLink className={activeClass} to="predictions">Predictions</NavLink>
                <NavLink className={activeClass} to="statistics">Statistics</NavLink>
                <NavLink className={activeClass} to="recommendations">Recommendations</NavLink>
            
            </nav>
        </div>
    )
}

export default Navbar
