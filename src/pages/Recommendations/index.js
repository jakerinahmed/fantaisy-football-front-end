import React from 'react'

import './style.css'

const Recommendations = () => {
  return (
    <div>

      <div className='login-div'>
        <p>To view your team please enter your email and password for your fantasy premier league team</p>
        <div className='form-div'>

          <form>
            <div className='login-details'>
              <label>Email:</label>
              <input type='email' placeholder="email"></input>
              <label>Password:</label>
              <input type='password' placeholder="password"></input>
            </div>
            <div className='user-id'>
              <label>User ID:</label>
              <input type='text' placeholder="user id"></input>
              
            </div>
          </form>
        </div>

      </div>
      <div className='teams-rec'>
        <div className='user-team'>
          <p>Current team</p>
        </div>
        <div className='user-op-team'>
          <p>Optimised team</p>
        </div>
      </div>
      <div className='suggestion'>
        <p>Our model suggests that you captain Haaland, give up on Salah because he is <span>washed</span>. </p>
      </div>
        

    </div>
  )
}

export default Recommendations