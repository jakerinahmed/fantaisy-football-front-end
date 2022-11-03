import React, { useEffect, useState } from 'react'
import { PlayerCard, LoginForm} from '../../components'
import axios from 'axios'

import './style.css'

const Recommendations = () => {
  
  const [userPlayers, setUserPlayers] = useState([])
  const [dreamPlayers, setDreamPlayers] = useState([
  {name:"Pickford",value: 4.5, points:6, position:"GK", team: "EVE" },
  {name:"Mee",value: 4.5, points:6, position:"DF", team:"BRE" },
  {name:"Mitchell",value: 4.5, points:0, position:"DF", team:"CRY" },
  {name:"Trippier",value: 5.8, points:8, position:"DF", team: "NEW" },
  {name:"Almiron",value: 5.6, points:11, position:"MF", team: "NEW" },    
  {name:"De Bruyne",value: 12.4, points:5, position:"MF", team: "MCI" },
  {name:"Neves",value: 5.5, points:7, position:"MF", team:"WOL" },
  {name:"Bentancur",value: 5.4, points:2, position:"MF", team: "TOT" },
  {name:"Wilson",value: 7.4, points:4, position:"MF", team: "NEW" },
  {name:"Moore",value: 5.4, points:9, position:"FW", team: "BOU"},
  {name:"Havertz",value: 7.7, points:9, position:"FW", team: "CHE"},
  ])
  const [optimalTeam, setOptimalTeam] = useState([])

  useEffect(() => {
    localStorage.clear()
  },[])

  

  const [transfers, setTransfers] = useState([])
  const [userPoints, setUserPoints] = useState(null)
  const [dreamPoints, setDreamPoints] = useState(null)
  const [suggestion, setSuggestion] = useState(true)
  const [optimal, setOptimal] = useState(null)
  const [optimalTransfer, setOptimalTransfer] = useState({})
  const [userID, setUserID] = useState(null)
  const [variable, setVariable] = useState(false)
  const [showTeams, setShowTeams] = useState(true)
  const [authorised, setAuthorised] = useState(false)
  const [tokenCheck, setTokenCheck] = useState(false)
  
  function updateTokenCheck() {
    setTokenCheck(!tokenCheck)
  }

  useEffect(() => {
    if(window.localStorage.token){
      setAuthorised(true)
    }
  },[tokenCheck])
let handleSubmit = async (e) => {
    setVariable(false)
    setShowTeams(false)
    e.preventDefault();
    try {
      await axios.post('https://fantaisyfootball.herokuapp.com/getuserteam', {
        userID: window.localStorage.user_id,  
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
        const response = await axios.get(`https://fantaisyfootball.herokuapp.com/userplayer/${id}`)
      
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
  console.log(userPlayers)
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
    var optimalTeamPlayers = []
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
         

          if(pointDiff > 2 && !currentPlayers.find(name => playerIn === name) && teams.filter(team => dreamPlayer.team === team) && teamCount <= 3){
            newTransfers.push({in:playerIn,out:playerOut, points:pointDiff})
            
            optimalTeamPlayers.push({name:dreamPlayer.name,value: dreamPlayer.value, points:dreamPlayer.points, position:dreamPlayer.position, team: dreamPlayer.team, pointDiff:pointDiff, playername: userPlayer.name})
            
            
          }
        }
      })
    })
    
    
    let maxPoints = []
    newTransfers.forEach(transfer => {
      maxPoints.push(transfer.points)
    })
    let optTransfers = []
    optimalTeamPlayers.forEach(optplayer => {

      const checkPlayers = optimalTeamPlayers.filter(player => player.name === optplayer.name)
      if(checkPlayers.length > 1){
        console.log(checkPlayers)
        let max = [] 
        checkPlayers.forEach(player => {
          max.push(player.pointDiff)
        })
        const opt = Math.max(...max)
        const optChangeIndex = max.findIndex(num => num === opt)
        optTransfers.push(checkPlayers[optChangeIndex])
      } 
    
    })
    console.log('unique values',... new Set(optTransfers))
    const uniquePlayer = [... new Set(optTransfers)]
    console.log(uniquePlayer)
    let newUserTeam = userPlayers
    uniquePlayer.forEach((player) => {
      userPlayers.findIndex((userPlayer) => player.playername )
    })
    
    const newOptimal = Math.max(...maxPoints)
    const optIndex = maxPoints.findIndex(num => num === newOptimal)
    const optTransfer = newTransfers[optIndex]
    setOptimalTransfer(optTransfer)
    setOptimal(newOptimal)

    console.log(newTransfers)
    setSuggestion(false)
    console.log('optimal team', optimalTeamPlayers)
    console.log('optimal', optTransfers)
    return setTransfers(newTransfers), setOptimalTeam(optimalTeamPlayers)
  } 
  if(authorised){

    return (
      <div>
      <div className='login-div'>
        <p role="instruction">To view your team please enter your userID</p>
        <div className='form-div'>

          <form onSubmit={handleSubmit}>
            <div className='user-id'>
              <input role="submit" type='submit' id="submit-button" value="Get my team!"></input>
            </div>
          </form>
        </div>

      </div>
      <div hidden = {showTeams}>

      <div className='teams-rec'>
      <div className='team-div'>
        <p>Your Team</p>
        <p>Your Total Points: {userPoints}</p>
        <div className='user-team'>
          <div className='goalies'>
            
           {variable ? renderPlayers(userPlayers,"GK"):<button onClick={() => setVariable(true)} className='button'>see players</button> } 

          </div>
          <div className='defenders'>
            {renderPlayers(userPlayers,"DF")} 
          </div>
          <div className='mids'>
            {renderPlayers(userPlayers,"MF")}
          </div>
          <div className='forwards'>
            {renderPlayers(userPlayers,"FW")}
          </div>
        </div>
        </div>

        <div className='team-div'>
        <p>Dream team</p>
        <p>Total Points: {dreamPoints}</p>
        <div className='user-op-team'>
        <div className='goalies'>
        {renderPlayers(dreamPlayers,"GK")}
            
          </div>
          <div className='defenders'>
          {renderPlayers(dreamPlayers,"DF")}
          
          </div>
          <div className='mids'>
          {renderPlayers(dreamPlayers,"MF")}
          

          </div>
          <div className='forwards'>
          {renderPlayers(dreamPlayers,"FW")}
         
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
              return <li key={i} style={ { color: transfer.points === optimal ? 'red' : 'none' } }  > Transfer in {transfer.in} for {transfer.out} for {transfer.points} points</li>
            })
          }

        
      </div>
      

    </div>
    </div>
  )
} else {
  return(
    <div>
      <LoginForm updateTokenCheck={updateTokenCheck}/>

    </div>

  )
}
}

export default Recommendations