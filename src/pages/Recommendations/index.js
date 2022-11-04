import React, { useEffect, useState } from 'react'
import { PlayerCard, LoginForm} from '../../components'
import axios from 'axios'

import './style.css'

const Recommendations = () => {
  
  const [userPlayers, setUserPlayers] = useState([])
  const [dreamPlayers, setDreamPlayers] = useState([])
  const [allPlayers, setAllPlayers] = useState([])
  const [optimalTeam, setOptimalTeam] = useState([])
  const [benchPlayers, setBenchPlayers] = useState([])

  

  const [transfers, setTransfers] = useState([])
  const [userPoints, setUserPoints] = useState(null)
  const [dreamPoints, setDreamPoints] = useState(null)
  const [suggestion, setSuggestion] = useState(true)
  const [optimal, setOptimal] = useState(null)
  const [optimalTransfer, setOptimalTransfer] = useState({})
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

  const logOut = () => {
    localStorage.clear()
  }

  const getPlayerData = async () => {
    try {
      const data = await axios.get('https://fantaisyfootball.herokuapp.com/allstats')
      return data.data
    } catch (error) {
      console.log(error.message)
    }
  }

  const formatPlayers = async () => {
    let predictedPlayers = await getPlayerData()
    let sortedPlayers = []
    predictedPlayers.forEach((player) => {
      const sortedPlayer = {
        name: player.name,
        value: player.cost,
        points: player.predicted_points,
        position: player.position,
        team: player.team, 
        code: player.code
      }
      sortedPlayers.push(sortedPlayer)
    })
    setAllPlayers(sortedPlayers)
  }

  useEffect(() => {
    formatPlayers()
  }, [])


 const fetchPlayerInfo = async (data) => {
      let allUserPlayers = [];
      data.forEach(async(id) =>{
        
        try {
        const response = await axios.get(`https://fantaisyfootball.herokuapp.com/userplayer/${id}`)
      
        const player = {
          name: response.data[0].name,
          value: response.data[0].cost,
          points: response.data[0].predicted_points,
          position: response.data[0].position,
          team: response.data[0].team,
          code: response.data[0].code 
        }
        allUserPlayers.push(player)
        
      } catch (err) {
        console.log(err);
      }
      
    })
    
    setUserPlayers(allUserPlayers)
 
  }
 
  function renderPlayers(players, position){
    // sortBenchPlayers(optimalTeam)
    return (
    players.map((player) => {
      if(benchPlayers.indexOf(player) === -1){

        if(player.position === position){
          
          return (  
            <PlayerCard name = {player.name} points = {player.points} code = {player.code}></PlayerCard>
            )
          } else {
            
          }
        }
    })
  )
}

// function sortBenchPlayers(players){
//   let benchPlayers = []
//   let goalkeeperCount = 0
//   let defenderCount = 0
//   let midfielderCount = 0
//   let attackerCount = 0
//   players.sort((a, b) => {
//     return a.predicted_points - b.predicted_points
//   })
//   players.forEach(p => {
//     if (p.position === "GK" && goalkeeperCount < 1 && benchPlayers.length < 4){
//       benchPlayers.push(p)
//       goalkeeperCount += 1
//     } else if (p.position === "DF" && defenderCount < 2 && benchPlayers.length < 4){
//       benchPlayers.push(p)
//       defenderCount +=1
//     } else if (p.position === "MF" && midfielderCount < 2 && benchPlayers.length < 4){
//       benchPlayers.push(p)
//       midfielderCount +=1
//     } else if (p.position === "FW" && attackerCount < 2 && benchPlayers.length < 4){
//       benchPlayers.push(p)
//       attackerCount +=1
//     }
//   }
//   )
//   sortBenchPlayers(benchPlayers)
//   console.log("benchplayers", benchPlayers);

// }



useEffect(() => {
    const totalPoints = dreamPlayers.reduce((accumulator, allPlayer) => {
      return accumulator + allPlayer.points
   },0)
    const userPoints = userPlayers.reduce((accumulator, userPlayer) => {
      return accumulator + userPlayer.points
   },0)
   setDreamPoints(totalPoints)
   setUserPoints(userPoints)
   
   
  },[userPlayers, allPlayers, variable, dreamPlayers])

  


  function teamOptimiser(){
    var newTransfers = []
    var optimalTeamPlayers = []
    let bank = userPlayers.reduce((accumulator, userPlayer) => {
       return accumulator + userPlayer.value
    },0)
    console.log("allplayers", allPlayers);
    let currentPlayers = []
    userPlayers.forEach(userPlayer => {
      currentPlayers.push(userPlayer.name)
    })
    let teams = []
    userPlayers.forEach(userPlayer => {
      teams.push(userPlayer.team)
    })
    userPlayers.forEach(userPlayer => {
      allPlayers.forEach(allPlayer => {
      
        if(userPlayer.value + 100 - bank >= allPlayer.value && userPlayer.position === allPlayer.position && userPlayer.name !== allPlayer.name){
          const pointDiff = allPlayer.points - userPlayer.points
          const playerIn = allPlayer.name
          const playerOut = userPlayer.name
          const costDiff = userPlayer.value - allPlayer.value
          
          if(allPlayer.team !== userPlayer.team){
            const newTeams = teams.filter(team => allPlayer.team === team)
            console.log("newTeams", teamCount);
            var teamCount = newTeams.length + 1
            console.log(teamCount)

          }

          if(pointDiff > 2 && !currentPlayers.find(name => playerIn === name) && teams.filter(team => allPlayer.team === team) && teamCount <= 3){
            
            let dupe = newTransfers.filter(player => playerIn === player.in)
            let dupeOut = newTransfers.filter(player => playerOut === player.out)
            
            if(dupe.length === 1 && dupe.points < pointDiff && dupeOut.length === 1){
              teams.push(allPlayer.team)
              teams.splice(teams.indexOf(userPlayer.team), 1)
              bank = bank - costDiff
              optimalTeamPlayers = optimalTeamPlayers.filter(player => playerIn !== player.name)
              optimalTeamPlayers = optimalTeamPlayers.filter(player => playerOut !== player.playername)
              newTransfers = newTransfers.filter(player => playerOut !== player.out)
              newTransfers = newTransfers.filter(player => playerIn !== player.in)
              newTransfers.push({in:playerIn,out:playerOut, points:pointDiff})
              optimalTeamPlayers.push({name:allPlayer.name,value: allPlayer.value, points:allPlayer.points, position:allPlayer.position, team: allPlayer.team, pointDiff:pointDiff, playername: userPlayer.name, code: allPlayer.code})
            }else if(dupeOut.length === 1 && dupeOut.points < pointDiff){
              teams.push(allPlayer.team)
              teams.splice(teams.indexOf(userPlayer.team), 1)
              bank = bank - costDiff
              optimalTeamPlayers = optimalTeamPlayers.filter(player => playerOut !== player.playername)
              newTransfers = newTransfers.filter(player => playerOut !== player.out)
              newTransfers.push({in:playerIn,out:playerOut, points:pointDiff})
              optimalTeamPlayers.push({name:allPlayer.name,value: allPlayer.value, points:allPlayer.points, position:allPlayer.position, team: allPlayer.team, pointDiff:pointDiff, playername: userPlayer.name, code: allPlayer.code})
              
            }else if (dupe.length === 0 && dupeOut.length === 0){
              teams.push(allPlayer.team)
              teams.splice(teams.indexOf(userPlayer.team), 1)
              bank = bank - costDiff
              newTransfers.push({in:playerIn,out:playerOut, points:pointDiff})
              optimalTeamPlayers.push({name:allPlayer.name,value: allPlayer.value, points:allPlayer.points, position:allPlayer.position, team: allPlayer.team, pointDiff:pointDiff, playername: userPlayer.name, code: allPlayer.code})
            }
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
        let max = [] 
        checkPlayers.forEach(player => {
          max.push(player.pointDiff)
        })
        const opt = Math.max(...max)
        const optChangeIndex = max.findIndex(num => num === opt)
        optimalTeamPlayers = optimalTeamPlayers.filter(optplayer => optplayer.playername !== checkPlayers[0].playername)
        console.log("optimaltpl", optimalTeamPlayers);
        optTransfers.push(checkPlayers[optChangeIndex])
        // if ((optTransfers.filter(player => player.name === checkPlayers[optchangeIndex].name).length !== 0){
        // }
      } else {
        optTransfers.push(optplayer)
      }
    console.log("optTransfers", optTransfers);
    })
    const uniquePlayer = [... new Set(optTransfers)]
    console.log("uniqueplayers", uniquePlayer)
    let newUserTeam = []
    userPlayers.sort((a, b) => {
      return a.predicted_points - b.predicted_points
    })
    userPlayers.forEach((player) => {
      newUserTeam.push(player)
    })
    uniquePlayer.forEach((player) => {
      const playerIndex = userPlayers.findIndex((userPlayer) => userPlayer.name === player.playername)
      newUserTeam[playerIndex] = player

    })
    console.log("newuserteam", newUserTeam)
    console.log("userplayers", userPlayers);
    setDreamPlayers(newUserTeam)
    
    const newOptimal = Math.max(...maxPoints)
    const optIndex = maxPoints.findIndex(num => num === newOptimal)
    const optTransfer = newTransfers[optIndex]
    setOptimalTransfer(optTransfer)
    setOptimal(newOptimal)
    
    console.log(newTransfers)
    setSuggestion(false)
    console.log('optimal team', optimalTeamPlayers)
    console.log('transfers', transfers)
    return setTransfers(newTransfers), setOptimalTeam(optimalTeamPlayers)
  } 
  if(authorised){

    return (
      <div>
      <div className='login-div'>
        <div className='form-div'>
          <form onSubmit={handleSubmit}>
            <div className='user-id'>
              <input role="submit" type='submit' id="submit-button" value="Get my team!"></input>
            </div>
          </form>
          <form onSubmit={logOut}>
            <div className='user-id'>
              <input role="submit" type='submit' id="submit-button" value="Log Out"></input>
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
      <button onClick={() => teamOptimiser()} className="button">Get opinion</button>
      <div hidden = {suggestion} id="suggestion-div">
          {
            transfers.map((transfer,i) => {
              return <li key={i} > Transfer in {transfer.in} for {transfer.out} for {transfer.points} points</li>
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
