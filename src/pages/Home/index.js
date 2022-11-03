import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div>

      <div className='intro-container'>
        <h1 role="welcome">Welcome to fant<span>AI</span>sy football!</h1>
        <p>A toolset for all Fantasy Premier League managers that optimises your team on a week to week basis using a cutting-edge machine learning model and a host of advanced stats for users to make the best decision on who they think might take their team to the next level.</p>
      </div>


      <div className='dream-main-div'>

        <div className='dream'>
          <h2>Our dream team is....</h2>
          <Link to="/predictions"><button>View Dream Team</button></Link>
        </div>

        <div className='recommend'>
          <h2>Want to see our recommendations?</h2>
          
          <Link role='redirect' to="/recommendations"><button>View analysis</button></Link>
          
        </div>

      </div>

    </div>
  )
}

export default Home
