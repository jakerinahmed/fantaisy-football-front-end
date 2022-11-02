import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div>

      <div className='intro-container'>
        <h1 role="welcome">Welcome to fant<span>AI</span>sy football!</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi perspiciatis necessitatibus ratione fuga omnis ad numquam tempore consectetur reiciendis soluta. Asperiores sint nulla ipsum dignissimos, nobis dicta mollitia quam quis?</p>
      </div>


      <div className='dream-main-div'>

        <div className='dream'>
          <h2>Our dream team is....</h2>
          <Link to="/predictions"><button>View Dream Team</button></Link>
        </div>

        <div className='recommend'>
          <h2>Want to see our recommendations?</h2>
          
          <Link to="/recommendations"><button>View analysis</button></Link>
          
        </div>

      </div>

    </div>
  )
}

export default Home
