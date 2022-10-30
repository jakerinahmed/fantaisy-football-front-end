import React, { useState } from 'react'

import './style.css'

const Recommendations = () => {
  const [userPlayers, setUserPlayers] = useState([
  {name:"de Gea",value: 4.9, points:6, position:"GK", team: "MUN" },
  {name:"Cancelo",value: 7.2 , points:6, position:"DEF", team:"MCI" },
  {name:"Thiago",value: 5.4, points:0, position:"DEF", team:"CHE" },
  {name:"White",value: 4.5, points:11, position:"DEF", team: "ARS" },    
  {name:"Trippier",value: 5.8, points:8, position:"DEF", team: "NEW" },
  {name:"Maddison",value: 8.1, points:7, position:"MID", team:"LEI" },
  {name:"De Bruyne",value: 12.2, points:5, position:"MID", team: "MCI" },
  {name:"Trossard",value: 6.8, points:2, position:"MID", team: "BHA" },
  {name:"Saka",value: 7.9, points:4, position:"MID", team: "ARS" },
  {name:"Haaland",value: 12.0, points:9, position:"FWD", team: "MCI"},
  {name:"Toney",value: 7.5, points:9, position:"FWD", team: "BRE"},
  {name:"Iverson",value: 3.9, points:9, position:"GK", team: "LEI"},
  {name:"Andreas",value: 4.5, points:4, position:"MID", team: "FUL"},
  {name:"Vestergaard", value: 3.9, points:0, position:"DEF", team: "LEI"},
  {name:"Greenwood",value: 4.2, points:0, position:"FWD", team: "LEE"},
  ])
  const [dreamPlayers, setDreamPlayers] = useState([
  {name:"Pickford",value: 4.5, points:6, position:"GK", team: "EVE" },
  {name:"Mee",value: 4.5, points:6, position:"DEF", team:"BRE" },
  {name:"Mitchell",value: 4.5, points:0, position:"DEF", team:"CRY" },
  {name:"Trippier",value: 5.8, points:8, position:"DEF", team: "NEW" },
  {name:"Almiron",value: 5.6, points:11, position:"MID", team: "NEW" },    
  {name:"De Bruyne",value: 12.4, points:5, position:"MID", team: "MCI" },
  {name:"Neves",value: 5.5, points:7, position:"MID", team:"WOL" },
  {name:"Bentancur",value: 5.4, points:2, position:"MID", team: "TOT" },
  {name:"Wilson",value: 7.4, points:4, position:"MID", team: "NEW" },
  {name:"Moore",value: 5.4, points:9, position:"FWD", team: "BOU"},
  {name:"Havertz",value: 7.7, points:9, position:"FWD", team: "CHE"},
  ])

  const [transfers, setTransfers] = useState([])

  function teamOptimiser(){
    var newTransfers = []
    const bank = userPlayers.reduce((accumulator, userPlayer) => {
       return accumulator + userPlayer.value
    },0)
    console.log(bank)
    userPlayers.forEach(userPlayer => {
      dreamPlayers.forEach(dreamPlayer => {
        if(userPlayer.value + 100 - bank >= dreamPlayer.value && userPlayer.position === dreamPlayer.position && userPlayer.name !== dreamPlayer.name){
          const pointDiff = dreamPlayer.points - userPlayer.points
          const playerIn = dreamPlayer.name
          const playerOut = userPlayer.name
          if(pointDiff > 0){
            newTransfers.push(`${playerIn} for ${playerOut} for ${pointDiff} points`)

          }
        }
      })
    })
    
    console.log(newTransfers)
    return setTransfers(newTransfers)
  } 
  return (
    <div>

      <div className='login-div'>
        <p role="instruction">To view your team please enter your email and password for your fantasy premier league team</p>
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
            <div className='user-id'>
              <input type='submit' id="submit-button" value="Get my team!"></input>
            </div>
          </form>
        </div>

      </div>
      <div className='teams-rec'>
        <p>Your team</p>
        <div className='user-team'>
          <div className='goalies'>
            {
              userPlayers.map((userPlayer,i) => {
                if(userPlayer.position == "GK"){
                  return (  
                  <div className='playercard'> 
                  <p key={i} > {userPlayer.name}</p>
                  <p>points: {userPlayer.points}</p>
                  </div>
                  )
                }
              })
            }
          </div>
          <div className='defenders'>
          {
              userPlayers.map((userPlayer,i) => {
                if(userPlayer.position == "DEF"){
                  return (  
                    <div className='playercard'> 
                    <p key={i} > {userPlayer.name}</p>
                    <p>points: {userPlayer.points}</p>
                    </div>
                    )
                }
              })
            }
          </div>
          <div className='mids'>
          {
              userPlayers.map((userPlayer,i) => {
                if(userPlayer.position == "MID"){
                  return (  
                    <div className='playercard'> 
                    <p key={i} > {userPlayer.name}</p>
                    <p>points: {userPlayer.points}</p>
                    </div>
                    )
                }
              })
            }

          </div>
          <div className='forwards'>
          {
              userPlayers.map((userPlayer,i) => {
                if(userPlayer.position == "FWD"){
                  return (  
                    <div className='playercard'> 
                    <p key={i} > {userPlayer.name}</p>
                    <p>points: {userPlayer.points}</p>
                    </div>
                    )
                }
              })
            }

          </div>
        </div>
        <p>Dream team</p>
        <div className='user-op-team'>
        <div className='goalies'>
            {
              dreamPlayers.map((dreamPlayer,i) => {
                if(dreamPlayer.position == "GK"){
                  return (  
                  <div className='playercard'> 
                  <p key={i} > {dreamPlayer.name}</p>
                  <p>points: {dreamPlayer.points}</p>
                  </div>
                  )
                }
              })
            }
          </div>
          <div className='defenders'>
          {
              dreamPlayers.map((dreamPlayer,i) => {
                if(dreamPlayer.position == "DEF"){
                  return (  
                    <div className='playercard'> 
                    <p key={i} > {dreamPlayer.name}</p>
                    <p>points: {dreamPlayer.points}</p>
                    </div>
                    )
                }
              })
            }
          </div>
          <div className='mids'>
          {
              dreamPlayers.map((dreamPlayer,i) => {
                if(dreamPlayer.position == "MID"){
                  return (  
                    <div className='playercard'> 
                    <p key={i} > {dreamPlayer.name}</p>
                    <p>points: {dreamPlayer.points}</p>
                    </div>
                    )
                }
              })
            }

          </div>
          <div className='forwards'>
          {
              dreamPlayers.map((dreamPlayer,i) => {
                if(dreamPlayer.position == "FWD"){
                  return (  
                    <div className='playercard'> 
                    <p key={i} > {dreamPlayer.name}</p>
                    <p>points: {dreamPlayer.points}</p>
                    </div>
                    )
                }
              })
            }

          </div>
        </div>
      </div>
      <div className='suggestion'>
        <p>Our model suggests that you captain Haaland, give up on Salah because he is <span>washed</span>. </p>
      </div>
      <button onClick={() => teamOptimiser()}>Get opinion</button>
        {
          transfers.map((transfer,i) => {
            return <li key={i} > {transfer}</li>
          })
        }

    </div>
  )
}

export default Recommendations