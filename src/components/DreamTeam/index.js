import React, { useEffect, useState } from 'react'
import './style.css'

import PlayerCard from '../PlayerCard'

const DreamTeam = ({ allData }) => {
  // console.log("alldata", allData)
  const [dreamTeamPlayers, setDreamTeamPlayers] = useState([])

  
  // function returnDreamTeamPlayers() {
  //   let goalkeeperCount = 0
  //   let defenderCount = 0
  //   let midfielderCount = 0
  //   let attckerCount = 0
  //   let dream_team = []
    
  //   for (let i = 0; i < 12; i++) {
  //     dream_team.push(allData[i])
  //     setDreamTeamPlayers(dream_team)
  //   }
    // console.log("allData", allData);
    // console.log(dream_team)
    // }
    
    useEffect(() => {
      async function returnDreamTeamPlayers(){
        let goalkeeperCount = 0
        let defenderCount = 0
        let midfielderCount = 0
        let attackerCount = 0
        let outfieldCount = 0
        let attOrMidCount = 0
        let dream_team = []

        let byPredictedPoints = allData

        byPredictedPoints.sort((a, b) => {
          return b.assists - a.assists;
      });

      console.log("bpp", byPredictedPoints)
      let i = 0
        while (dream_team.length < 11) {
          if ((byPredictedPoints[i].position == "MF") && midfielderCount < 5 && attOrMidCount < 7 && outfieldCount < 10){
            dream_team.push([byPredictedPoints[i].name, byPredictedPoints[i].position])
            midfielderCount += 1
            outfieldCount +=1
            attOrMidCount +=1
            i += 1
          }
          else if ((byPredictedPoints[i].position == "FW") && attackerCount < 3 && attOrMidCount < 7 && outfieldCount < 10){
            dream_team.push([byPredictedPoints[i].name, byPredictedPoints[i].position])
            attackerCount += 1
            outfieldCount +=1
            attOrMidCount +=1
            i += 1
          }
          else if ((byPredictedPoints[i].position == "DF") && defenderCount < 5 && outfieldCount < 10){
            dream_team.push([byPredictedPoints[i].name, byPredictedPoints[i].position])
            defenderCount += 1
            outfieldCount +=1
            i += 1
          }
          else if ((byPredictedPoints[i].position == "GK") && goalkeeperCount < 1){
            dream_team.push([byPredictedPoints[i].name, byPredictedPoints[i].position])
            goalkeeperCount += 1
            i += 1
          }
          else {
            dream_team = dream_team
            i += 1
          }
        }
        console.log("allData", allData);
        console.log("dreamteam", dream_team)
        setDreamTeamPlayers(dream_team)
      }
      returnDreamTeamPlayers()
    }, [allData])

  if (!dreamTeamPlayers[0]) {
    console.log("hello")
    return (
      <div className='dream-team' role='dream-team'>
      </div>
    )
  } else if (dreamTeamPlayers[0]) {
    console.log(dreamTeamPlayers[0])
    return (
      <div className='dream-team' role='dream-team'>
        <div className='dream-team-goalkeeper'>
        {dreamTeamPlayers.filter(x => x[1] == "GK")}
        </div>
        <div className='dream-team-defenders'>
        {dreamTeamPlayers.filter(x => x[1] == "DF")}
        </div>
        <div className='dream-team-midfielders'>
        {dreamTeamPlayers.filter(x => x[1] == "MD")}
        </div>
        <div className='dream-team-attackers'>
        {dreamTeamPlayers.filter(x => x[1] == "FW")}
        </div>
      </div>
    )
    
  }

}

export default DreamTeam
