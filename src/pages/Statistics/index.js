import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

import './style.css'


const Stats = () => {
    const [allData, setAllData] = useState([])
    const [playerCode, setPlayerCode] = useState(58822)
    useEffect(() => {
        const getAllData = async () => {
            const response = await axios.get(`https://fantaisyfootball.herokuapp.com/allstats`)
            setAllData(response.data)
        }
        getAllData()
    }, [])
    const [names, setNames] = useState(["person"])
    const [playerData, setPlayerData] = useState(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",])

    const handleTeamChoice = async (e) => {
        const team = e.target.value
        const playerNames = allData.filter(p => p.team === team)
        const options = []
        for (let i = 0; i < playerNames.length; i++) {
            options.push(playerNames[i].name)
        }
        setNames(options)
    }
    const handlePlayerChoice = (e) => {
        const name = e.target.value
        const data_array = allData.filter(p => p.name === name);
        const data = data_array[0]
        setPlayerCode(data.code)
        setPlayerData(data)
    }

    const renderStats = ([assists, bonusPoints, chanceOfPlaying, cleanSheets, code, creativity, goals, goalsConceded, ictIndex, id, influence, minutes, name, ownGoals, pensMissed, pensSaved, playerID, ppg, position, redCards, saves, selectedPerc, corners, freeKicks, pens, team, threat, totalPoints, transfersIn, transfersInRound, transfersOut, transfersOutRound, yellowCards]) => {
        if (position === "ATK") {
            return (
                <div className='playerStats'>
                    <div>
                        <img src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${playerCode}.png`} alt="" />
                    </div>
                    <div>
                        <div className='playerInfo'>
                            <h2>{name}</h2>
                            <h3>{position}</h3>
                            <h4>{team}</h4>
                        </div>
                        <div className='bonusStats'>
                            <p>Total Points: {totalPoints}</p>
                            <p>Points Per Game: {ppg}</p>
                            <p>Goals: {goals}</p>
                            <p>Assists: {assists}</p>
                            <p>Goals Conceded: {goalsConceded}*</p>
                            <p>Clean Sheets: {cleanSheets}*</p>
                            <p>Bonus Points: {bonusPoints}</p>
                            <p>Minutes Played: {minutes}</p>
                            <p>Selected by Percentage: {selectedPerc}%</p>
                            <p>Influence: {influence}</p>
                            <p>Creativity: {creativity}</p>
                            <p>Threat: {threat}</p>
                            <p>ICT Index: {ictIndex}</p>
                            <p>Pens Missed: {pensMissed}</p>
                            <p>Takes Corners: {corners}</p>
                            <p>Takes Free Kicks: {freeKicks}</p>
                            <p>Takes Penalties: {pens}</p>
                            <p>Own Goals: {ownGoals}</p>
                            <p>Yellow Cards: {yellowCards}</p>
                            <p>Red Cards: {redCards}</p>
                        </div>
                    </div>
                </div>
            )

        } else if (position === "MID") {
            return (
                <div className='playerStats'>
                    <div>
                        <img src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${playerCode}.png`} alt="" />
                    </div>
                    <div>
                        <div className='playerInfo'>
                            <h2>{name}</h2>
                            <h3>{position}</h3>
                            <h4>{team}</h4>
                        </div>
                        <div className='bonusStats'>
                            <p>Total Points: {totalPoints}</p>
                            <p>Points Per Game: {ppg}</p>
                            <p>Goals: {goals}</p>
                            <p>Assists: {assists}</p>
                            <p>Goals Conceded: {goalsConceded}</p>
                            <p>Clean Sheets: {cleanSheets}</p>
                            <p>Bonus Points: {bonusPoints}</p>
                            <p>Minutes Played: {minutes}</p>
                            <p>Selected by Percentage: {selectedPerc}%</p>
                            <p>Influence: {influence}</p>
                            <p>Creativity: {creativity}</p>
                            <p>Threat: {threat}</p>
                            <p>ICT Index: {ictIndex}</p>
                            <p>Pens Missed: {pensMissed}</p>
                            <p>Takes Corners: {corners}</p>
                            <p>Takes Free Kicks: {freeKicks}</p>
                            <p>Takes Penalties: {pens}</p>
                            <p>Own Goals: {ownGoals}</p>
                            <p>Yellow Cards: {yellowCards}</p>
                            <p>Red Cards: {redCards}</p>
                        </div>
                    </div>
                </div>
            )
        } else if (position === "DEF") {
            return (
                <div className='playerStats'>
                    <div>
                        <img src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${playerCode}.png`} alt="" />
                    </div>
                    <div>
                        <div className='playerInfo'>
                            <h2>{name}</h2>
                            <h3>{position}</h3>
                            <h4>{team}</h4>
                        </div>
                        <div className='bonusStats'>
                            <p>Total Points: {totalPoints}</p>
                            <p>Points Per Game: {ppg}</p>
                            <p>Goals: {goals}</p>
                            <p>Assists: {assists}</p>
                            <p>Goals Conceded: {goalsConceded}</p>
                            <p>Clean Sheets: {cleanSheets}</p>
                            <p>Bonus Points: {bonusPoints}</p>
                            <p>Minutes Played: {minutes}</p>
                            <p>Selected by Percentage: {selectedPerc}%</p>
                            <p>Influence: {influence}</p>
                            <p>Creativity: {creativity}</p>
                            <p>Threat: {threat}</p>
                            <p>ICT Index: {ictIndex}</p>
                            <p>Pens Missed: {pensMissed}</p>
                            <p>Takes Corners: {corners}</p>
                            <p>Takes Free Kicks: {freeKicks}</p>
                            <p>Takes Penalties: {pens}</p>
                            <p>Own Goals: {ownGoals}</p>
                            <p>Yellow Cards: {yellowCards}</p>
                            <p>Red Cards: {redCards}</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='playerStats'>
                    <div>
                        <img src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${playerCode}.png`} alt="" />
                    </div>
                    <div>
                        <div className='playerInfo'>
                            <h2>{name}</h2>
                            <h3>{position}</h3>
                            <h4>{team}</h4>
                        </div>
                        <div className='bonusStats'>
                            <p>Total Points: {totalPoints}</p>
                            <p>Points Per Game: {ppg}</p>
                            <p>Saves: {saves}</p>
                            <p>Pens Saved: {pensSaved}</p>
                            <p>Clean Sheets: {cleanSheets}</p>
                            <p>Goals Conceded: {goalsConceded}</p>
                            <p>Bonus Points: {bonusPoints}</p>
                            <p>Goals: {goals}</p>
                            <p>Assists: {assists}</p>
                            <p>Minutes Played: {minutes}</p>
                            <p>Selected by Percentage: {selectedPerc}%</p>
                            <p>Influence: {influence}</p>
                            <p>Creativity: {creativity}</p>
                            <p>Threat: {threat}</p>
                            <p>ICT Index: {ictIndex}</p>
                            <p>Own Goals: {ownGoals}</p>
                            <p>Yellow Cards: {yellowCards}</p>
                            <p>Red Cards: {redCards}</p>
                        </div>
                    </div>

                </div>
            )
        }
    }


    function renderNames(names) {
        return names.map(n => <option value={n}>{n}</option>)
    }
    return (
        <div>
            <select onInput={handleTeamChoice}>
                <option value="Arsenal F.C.">Arsenal</option>
                <option value="Aston Villa F.C.">Aston Villa</option>
                <option value="A.F.C. Bournemouth">Bournemouth</option>
                <option value="Brentford F.C.">Brentford</option>
                <option value="Brighton & Hove Albion F.C.">Brighton & Hove Albion</option>
                <option value="Chelsea F.C.">Chelsea</option>
                <option value="Crystal Palace F.C.">Crystal Palace</option>
                <option value="Everton F.C.">Everton</option>
                <option value="Fulham F.C.">Fulham</option>
                <option value="Leicester City F.C.">Leicester City</option>
                <option value="Leeds United">Leeds United</option>
                <option value="Liverpool F.C.">Liverpool</option>
                <option value="Manchester City F.C.">Manchester City</option>
                <option value="Manchester United F.C.">Manchester United</option>
                <option value="Newcastle United F.C.">Newcastle United</option>
                <option value="Nottingham Forest F.C.">Nottingham Forest</option>
                <option value="Southampton F.C.">Southampton</option>
                <option value="Tottenham Hotspur F.C.">Tottenham Hotspur</option>
                <option value="West Ham United F.C.">West Ham United</option>
                <option value="Wolverhampton Wanderers F.C.">Wolverhampton Wanderers</option>
            </select>
            <select onInput={handlePlayerChoice}>
                {renderNames(names)}
            </select>
            <div className='comparePlayers'>
                <div className='playerOne'>
                    {renderStats(Object.values(playerData))}
                </div>
                <div className='playerTwo'>

                </div>
            </div>
        </div>
    )
}

export default Stats
