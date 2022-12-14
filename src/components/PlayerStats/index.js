import React from 'react'
import { useState } from 'react'

const PlayerStats = (props) => {
    let takesFk = 0
    let takesC = 0
    let takesP = 0
   
    if (props.freeKicks === 1){
        takesFk = "Often"
    } else if (props.freeKicks === 2) {
        takesFk = "Sometimes"
    } else if (props.freeKicks === 3) {
        takesFk = "Rarely"
    } else {
        takesFk = "Never"
    }

    if (props.corners === 1){
         takesC = "Often"
    } else if (props.corners === 2) {
         takesC = "Sometimes"
    } else if (props.corners === 3) {
         takesC = "Rarely"
    } else {
         takesC = "Never"
    }

    if (props.pens === 1){
         takesP = "Often"
    } else if (props.pens === 2) {
         takesP = "Sometimes"
    } else if (props.pens === 3) {
         takesP = "Rarely"
    } else {
         takesP = "Never"
    }

    return (
        <div className='playerStats' role='playerStats'>
            <div className='player-stuff'>

                <div className='photoDiv'>
                    <img className='photo' src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.code}.png`} alt="" />
                </div>
                <div>
                    <div className='playerInfo'>
                        <h2>{props.name}</h2>
                        <h3>{props.team}</h3>
                        <h4>{props.position}</h4>
                    </div>
                    <div className='generalStats'>
                        <table className='statistics'>
                            <tr>
                                <th>Total Points:</th>
                                <td>{props.totalPoints}</td>
                            </tr>
                            <tr>
                                <th>Points Per Game:</th>
                                <td>{props.ppg}</td>
                            </tr>
                            <tr>
                                <th>Points predicted for next fixture</th>
                                <td>{props.predictedPoints}</td>
                            </tr>
                            <tr>
                                <th>Minutes Played:</th>
                                <td>{props.minutes}</td>
                            </tr>
                            <tr>
                                <th>Average Minutes Per Game:</th>
                                <td>{props.avgMinutes}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div className='bonusStats'>
                <table className='statistics'>
                    <tr>
                        <th>Goals:</th>
                        <td>{props.goals}</td>
                    </tr>
                    <tr>
                        <th>Goals per 90:</th>
                        <td>{props.avgGoalsPer90}</td>
                    </tr>
                    <tr>
                        <th>Assists:</th>
                        <td>{props.assists}</td>
                    </tr>
                    <tr>
                        <th>Assists per 90:</th>
                        <td>{props.avgAssistsPer90}</td>
                    </tr>
                    <tr>
                        <th>Takes Corners ?</th>
                        <td>{takesC}</td>
                    </tr>
                    <tr>
                        <th> Takes Free Kicks ?</th>
                        <td>{takesFk}</td>
                    </tr>
                    <tr>
                        <th>Takes Penalties ?</th>
                        <td>{takesP}</td>
                    </tr>
                </table>
                <table className='statistics'>
                    <tr>
                        <th>ICT Index:</th>
                        <td>{props.ictIndex}</td>
                    </tr>
                    <tr>
                        <th>ICT per 90:</th>
                        <td>{props.avgICTPer90}</td>
                    </tr>
                    <tr>
                        <th>Influence:</th>
                        <td>{props.influence}</td>
                    </tr>
                    <tr>
                        <th>Influence per 90:</th>
                        <td>{props.avgInfluencePer90}</td>
                    </tr>
                    <tr>
                        <th>Creativity:</th>
                        <td>{props.avgCreativityPer90}</td>
                    </tr>
                    <tr>
                        <th>Threat:</th>
                        <td>{props.avgThreatPer90}</td>
                    </tr>
                </table>
                <table className='statistics'>
                    <tr>
                        <th>Goals Conceded:</th>
                        <td>{props.goalsConceded}</td>
                    </tr>
                    <tr>
                        <th>Goals Conceded per 90:</th>
                        <td>{props.avgGoalsConcededPer90}</td>
                    </tr>
                    <tr>
                        <th>Cleansheets:</th>
                        <td>{props.cleanSheets}</td>
                    </tr>
                    <tr>
                        <th>Own Goals:</th>
                        <td>{props.ownGoals}</td>
                    </tr>
                    <tr>
                        <th>Yellow Cards:</th>
                        <td>{props.yellowCards}</td>
                    </tr>
                    <tr>
                        <th>Red Cards:</th>
                        <td>{props.redCards}</td>
                    </tr>
                </table>

            </div>

        </div>
    )
}

export default PlayerStats
