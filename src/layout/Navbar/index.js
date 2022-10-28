import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (

        // const activeClass = (({ isActive }) => isActive ? 'current' : 'nav-item')

        <div>
            <ul className="nav">
                <NavLink /*className={activeClass}*/ to="/" end>Home</NavLink>
                <NavLink /*className={activeClass}*/ to='about'>About</NavLink>
                <NavLink /*className={activeClass}*/ to="predictions">Predictions</NavLink>
                <NavLink /*className={activeClass}*/ to="statistics">Statistics</NavLink>
                <NavLink /*className={activeClass}*/ to="recommendations">Recommendations</NavLink>
            </ul>
        </div>
    )
}

export default Navbar
