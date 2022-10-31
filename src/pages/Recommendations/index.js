import React, { useEffect, useState } from 'react'
import { PlayerCard, LoginForm} from '../../components'
import axios from 'axios'

import './style.css'

const Recommendations = () => {
  const [userPlayers, setUserPlayers] = useState([])
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
  {name:"Moore",value: 5.4, points:9, position:"ATK", team: "BOU"},
  {name:"Havertz",value: 7.7, points:9, position:"ATK", team: "CHE"},
  ])

  const [transfers, setTransfers] = useState([])
  const [userPoints, setUserPoints] = useState(null)
  const [dreamPoints, setDreamPoints] = useState(null)
  const [suggestion, setSuggestion] = useState(true)
  const [optimal, setOptimal] = useState(null)
  const [optimalTransfer, setOptimalTransfer] = useState({})
  const [userID, setUserID] = useState(null)
  const [variable, setVariable] = useState(false)
  const [showTeams, setShowTeams] = useState(true)
  
  

  
let handleSubmit = async (e) => {
    setVariable(false)
    setShowTeams(false)
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/getuserteam', {
        userID: userID,
        gameweek:14
      })
      .then(function (response) {
        fetchPlayerInfo(response.data)

      })
      .catch(function (error) {
        console.log(error);
      });
    } catch (err) {
      console.log(err);
    }
    
  };


 const fetchPlayerInfo = async (data) => {
      let allPlayers = [];
      data.forEach(async(id) =>{
        
        try {
        const response = await axios.get(`http://127.0.0.1:5000/userplayer/${id}`)
        
        const player = {
          name: response.data[0].name,
          value: response.data[0].cost,
          points: Math.floor(Math.random()*15),
          position: response.data[0].position,
          team: response.data[0].team, 
        }
        allPlayers.push(player)
        
      } catch (err) {
        console.log(err);
      }
      
    })
    
    setUserPlayers(allPlayers)
 
  }
 
function renderPlayers(players, position){
  
  return (

    players.map((player) => {
      
      if(player.position === position){
        
        return (  
          <PlayerCard name = {player.name} points = {player.points} optimal= {optimalTransfer}></PlayerCard>
        )
      } else {
        
      }
    })
  )
}

useEffect(() => {
    const totalPoints = dreamPlayers.reduce((accumulator, dreamPlayer) => {
      return accumulator + dreamPlayer.points
   },0)
    const userPoints = userPlayers.reduce((accumulator, userPlayer) => {
      return accumulator + userPlayer.points
   },0)
   setDreamPoints(totalPoints)
   setUserPoints(userPoints)
   
   
  },[userPlayers, dreamPlayers, variable])

  


  function teamOptimiser(){
    var newTransfers = []
    const bank = userPlayers.reduce((accumulator, userPlayer) => {
       return accumulator + userPlayer.value
    },0)

    let currentPlayers = []
    userPlayers.forEach(userPlayer => {
      currentPlayers.push(userPlayer.name)
    })
    let teams = []
    userPlayers.forEach(userPlayer => {
      teams.push(userPlayer.team)
    })
    console.log(bank)
    userPlayers.forEach(userPlayer => {
      dreamPlayers.forEach(dreamPlayer => {
      
        if(userPlayer.value + 100 - bank >= dreamPlayer.value && userPlayer.position === dreamPlayer.position && userPlayer.name !== dreamPlayer.name){
          const pointDiff = dreamPlayer.points - userPlayer.points
          const playerIn = dreamPlayer.name
          const playerOut = userPlayer.name
          
          if(dreamPlayer.team !== userPlayer.team){
            const newTeams = teams.filter(team => dreamPlayer.team === team)
            console.log(newTeams)
            var teamCount = newTeams.length + 1

          }
         

          if(pointDiff > 0 && !currentPlayers.find(name => playerIn === name) && teams.filter(team => dreamPlayer.team === team) && teamCount <= 3){
            
            newTransfers.push({in:playerIn,out:playerOut, points:pointDiff})

          }
        }
      })
    })
    let maxPoints = []
    newTransfers.forEach(transfer => {
      maxPoints.push(transfer.points)
    })
    const newOptimal = Math.max(...maxPoints)
    const optIndex = maxPoints.findIndex(num => num === newOptimal)
    const optTransfer = newTransfers[optIndex]
    setOptimalTransfer(optTransfer)
    setOptimal(newOptimal)
    console.log(newTransfers)
    setSuggestion(false)
    return setTransfers(newTransfers) 
  } 
  return (
    <div>
      <div className='login-div'>
        <p role="instruction">To view your team please enter your email and password for your fantasy premier league team</p>
        <div className='form-div'>

          <form onSubmit={handleSubmit}>
            <div className='user-id'>
              <label>User ID:</label>
              <input type='text' placeholder="user id" onChange={(e) => setUserID(e.target.value)} required></input>
            </div>
            <div className='user-id'>
              <input  type = 'submit' id="submit-button" value="Get my team!"></input>
            </div>
          </form>
        </div>

      </div>
      <div hidden = {showTeams}>

      <div className='teams-rec'>
      <div className='team-div'>
        <p>Your team</p>
        <p>Your total points: {userPoints}</p>
        <div className='user-team'>
          <div className='goalies'>
            
           {variable ? renderPlayers(userPlayers,"GK"):<button onClick={() => setVariable(true)} className='button'>see players</button> } 

          </div>
          <div className='defenders'>
            {renderPlayers(userPlayers,"DEF")} 
          </div>
          <div className='mids'>
            {renderPlayers(userPlayers,"MID")}
          </div>
          <div className='forwards'>
            {renderPlayers(userPlayers,"ATK")}
          </div>
        </div>
        </div>

        <div className='team-div'>
        <p>Dream team</p>
        <p>total points: {dreamPoints}</p>
        <div className='user-op-team'>
        <div className='goalies'>
        {renderPlayers(dreamPlayers,"GK")}
            
          </div>
          <div className='defenders'>
          {renderPlayers(dreamPlayers,"DEF")}
          
          </div>
          <div className='mids'>
          {renderPlayers(dreamPlayers,"MID")}
          

          </div>
          <div className='forwards'>
          {renderPlayers(dreamPlayers,"ATK")}
         
          </div>
        </div>
      </div>
      </div>
      <div className='suggestion'>
        <p>Our model suggests that you captain Haaland, give up on Salah because he is <span>washed</span>. </p>
      </div>
      <button onClick={() => teamOptimiser()} className="button">Get opinion</button>
      <div hidden = {suggestion} id="suggestion-div">
        
          {
            transfers.map((transfer,i) => {
              return <li key={i} style={ { color: transfer.points === optimal ? 'red' : 'none' } }  > Transfer {transfer.in} for {transfer.out} for {transfer.points} points</li>
            })
          }

        
      </div>
      

    </div>
    {/* <LoginForm /> */}
    </div>
  )
}

export default Recommendations