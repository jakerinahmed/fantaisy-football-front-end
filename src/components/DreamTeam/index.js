import React, { useEffect, useState } from 'react'
import './style.css'

import PlayerCard from '../PlayerCard'

const DreamTeam = ({ allData }) => {
  // console.log("alldata", allData)
  const [dreamTeamPlayers, setDreamTeamPlayers] = useState([])
    
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
          return b.predicted_points - a.predicted_points;
      });

      console.log("bpp", byPredictedPoints)
      let i = 0
        while (dream_team.length < 11) {
          if ((byPredictedPoints[i].position == "MF") && midfielderCount < 5 && attOrMidCount < 7 && outfieldCount < 10){
            dream_team.push({"name": byPredictedPoints[i].name, "position": byPredictedPoints[i].position, "predicted_points": byPredictedPoints[i].predicted_points, "code": byPredictedPoints[i].code})
            midfielderCount += 1
            outfieldCount +=1
            attOrMidCount +=1
            i += 1
          }
          else if ((byPredictedPoints[i].position == "FW") && attackerCount < 3 && attOrMidCount < 7 && outfieldCount < 10){
            dream_team.push({"name": byPredictedPoints[i].name, "position": byPredictedPoints[i].position, "predicted_points": byPredictedPoints[i].predicted_points, "code": byPredictedPoints[i].code})
            attackerCount += 1
            outfieldCount +=1
            attOrMidCount +=1
            i += 1
          }
          else if ((byPredictedPoints[i].position == "DF") && defenderCount < 5 && outfieldCount < 10){
            dream_team.push({"name": byPredictedPoints[i].name, "position": byPredictedPoints[i].position, "predicted_points": byPredictedPoints[i].predicted_points, "code": byPredictedPoints[i].code})
            defenderCount += 1
            outfieldCount +=1
            i += 1
          }
          else if ((byPredictedPoints[i].position == "GK") && goalkeeperCount < 1){
            dream_team.push({"name": byPredictedPoints[i].name, "position": byPredictedPoints[i].position, "predicted_points": byPredictedPoints[i].predicted_points, "code": byPredictedPoints[i].code})
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
    
    console.log("dtgk", dreamTeamPlayers.filter(x => x.position == "GK"))

    let goalkeeperContent = []
    let defenderContent = []
    let midfielderContent = []
    let attackerContent = []

    for (let i=0; i < dreamTeamPlayers.filter(x => x.position == "GK").length; i++ ){
       goalkeeperContent.push(<PlayerCard name={dreamTeamPlayers.filter(x => x.position == "GK")[i].name} code={dreamTeamPlayers.filter(x => x.position == "GK")[i].code} points={dreamTeamPlayers.filter(x => x.position == "GK")[i].predicted_points} optimal={[{in:"", out: ""}]}></PlayerCard>)
    }
    for (let i=0; i < dreamTeamPlayers.filter(x => x.position == "DF").length; i++ ){
       defenderContent.push(<PlayerCard name={dreamTeamPlayers.filter(x => x.position == "DF")[i].name} code={dreamTeamPlayers.filter(x => x.position == "DF")[i].code} points={dreamTeamPlayers.filter(x => x.position == "DF")[i].predicted_points} optimal={[{in:"", out: ""}]}></PlayerCard>)
    }
    for (let i=0; i < dreamTeamPlayers.filter(x => x.position == "MF").length; i++ ){
       midfielderContent.push(<PlayerCard name={dreamTeamPlayers.filter(x => x.position == "MF")[i].name} code={dreamTeamPlayers.filter(x => x.position == "MF")[i].code} points={dreamTeamPlayers.filter(x => x.position == "MF")[i].predicted_points} optimal={[{in:"", out: ""}]}></PlayerCard>)
    }
    for (let i=0; i < dreamTeamPlayers.filter(x => x.position == "FW").length; i++ ){
       attackerContent.push(<PlayerCard name={dreamTeamPlayers.filter(x => x.position == "FW")[i].name} code={dreamTeamPlayers.filter(x => x.position == "FW")[i].code} points={dreamTeamPlayers.filter(x => x.position == "FW")[i].predicted_points} optimal={[{in:"", out: ""}]}></PlayerCard>)
    }

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
            {goalkeeperContent}
        </div>
        <div className='dream-team-defenders'>
        {defenderContent}
        </div>
        <div className='dream-team-midfielders'>
        {midfielderContent}
        </div>
        <div className='dream-team-attackers'>
        {attackerContent}
        </div>
      </div>
    )
    
  }

}

export default DreamTeam
