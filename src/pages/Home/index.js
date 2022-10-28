import React from 'react'
import './style.css'

const Home = () => {
  return (
    <div>

      <div className='intro-container'>
        <h1>Welcome to fant<span>AI</span>sy football!</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi perspiciatis necessitatibus ratione fuga omnis ad numquam tempore consectetur reiciendis soluta. Asperiores sint nulla ipsum dignissimos, nobis dicta mollitia quam quis?</p>
      </div>


      <div className='dream-main-div'>

        <div className='dream'>
          <h2>Our dream team is....</h2>
          <button>View Dream Team</button>
        </div>

        <div className='recommend'>
          <h2>Want to see our recommendations?</h2>
          <button>View analysis</button>
        </div>

      </div>

    </div>
  )
}

export default Home
