import React from 'react'
import './style.css'

const About = () => {
  return (
    <div>

      <div className='fpl-about'>
        <h2> About fantasy premier league</h2>
        <ul>
            <li>How the game works</li>
            <li>The rules</li>
            <li>The overall aim</li>
        </ul>
      </div>


      <div className='model-about'>

        <h2> About our model</h2>
        <ul>
            <li>Reasoning behind model and aim</li>
            <li>Functionality</li>
            <li>Methodology about the model</li>
            <li>Button to view results</li>
        </ul>

      </div>

    </div>
  )
}

export default About