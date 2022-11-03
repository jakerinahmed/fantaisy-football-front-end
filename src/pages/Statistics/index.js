import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';

import './style.css'


const Stats = () => {
    const [allData, setAllData] = useState([])
    const [graphData, setGraphData] = useState([])
    const [xAxis, setXAxis]= useState('minutes')
    const [yAxis, setYAxis] = useState('influence')
    const [renderGraph, setRenderGraph] = useState(false)
    const [teamFilter, setTeamFilter] = useState("all")
    const [positionFilter, setPositionFilter] = useState("all")
    
    useEffect(() => {
        const getAllData = async () => {
            const response = await axios.get(`https://fantaisyfootball.herokuapp.com/allstats`)
            setAllData(response.data)
            setGraphData(response.data)
        }
        getAllData()
    }, [])
    const [names, setNames] = useState(["Select Player"])
    const [namesTwo, setNamesTwo] = useState(["Select Player"])
    const [playerData, setPlayerData] = useState("")
    const [playerDataTwo, setPlayerDataTwo] = useState("")
    const [playersArray, setPlayersArray] = useState([playerData,playerDataTwo])
    
    const handleTeamChoice = async (e) => {
        const team = e.target.value
        console.log(allData)
        const playerNames = allData.filter(p => p.team === team)
        const options = []
        for (let i = 0; i < playerNames.length; i++) {
            options.push(playerNames[i].name)
        }
        setNames(options)
    }

    const handleTeamChoiceTwo = async (e) => {
        const team = e.target.value
        const playerNames = allData.filter(p => p.team === team)
        const options = []
        for (let i = 0; i < playerNames.length; i++) {
            options.push(playerNames[i].name)
        }
        setNamesTwo(options)
    }
    const handlePlayerChoice = (e) => {
        const name = e.target.value
        const data_array = allData.filter(p => p.name === name);
        const data = data_array[0]
        setPlayerData(data)
        setPlayersArray([data, playersArray[1]])
        console.log(playersArray)
    }

    const handlePlayerChoiceTwo = (e) => {
        const name = e.target.value
        const data_array = allData.filter(p => p.name === name);
        const data = data_array[0]
        setPlayerDataTwo(data)
        setPlayersArray([playersArray[0], data])
    }

    const renderStats = ([assists, avgAssistsPer90, avgCreativityPer90, avgGoalsConcededPer90, avgGoalsPer90, avgICTPer90, avgInfluencePer90, avgMinutes, avgThreatPer90, bonusPoints, chanceOfPlaying, cleanSheets, code, cost, creativity, goals, goalsConceded, ictIndex, id, influence, minutes, name, ownGoals, pensMissed, pensSaved, playerID, ppg, position, predictedPoints, redCards, saves, selectedPerc, corners, freeKicks, pens, team, threat, totalPoints, transfersIn, transfersInRound, transfersOut, transfersOutRound, yellowCards]) => {
        if (position === "FW" || position === "MF" || position === "DF" ) {
            return (
                <div className='playerStats'>
                    <div className='player-stuff'>

                        <div className='photoDiv'>
                            <img className='photo' src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${code}.png`} alt="" />
                        </div>
                        <div>
                        <div className='playerInfo'>
                            <h2>{name}</h2>
                            <h3>{team}</h3>
                            <h4>{position}</h4>
                        </div>
                        <div className='generalStats'>
                            <table className='statistics'>
                            <tr>
                            <th>Total Points:</th>
                            <td>{totalPoints}</td>
                            </tr>
                            <tr>
                            <th>Points Per Game:</th>
                            <td>{ppg}</td>
                            </tr>
                            <tr>
                            <th>Points predicted for next fixture</th>
                            <td>{predictedPoints}</td>
                            </tr>
                            <tr>
                            <th>Minutes Played:</th>
                            <td>{minutes}</td>
                            </tr>
                            <tr>
                            <th>Average Minutes Per Game:</th>
                            <td>{avgMinutes}</td>
                            </tr>
                            </table>
                        </div>
                        </div>
                    </div>
                    <div className='bonusStats'>
                        <table className='statistics'>
                        <tr>
                            <th>Goals:</th>
                            <td>{goals}</td>
                        </tr>
                        <tr>
                            <th>Goals per 90:</th>
                            <td>{avgGoalsPer90}</td>
                        </tr>
                        <tr>
                            <th>Assists:</th>
                            <td>{assists}</td>
                        </tr>
                        <tr>
                            <th>Assists per 90:</th>
                            <td>{avgAssistsPer90}</td>
                        </tr>
                        <tr>
                            <th>Takes Corners ?</th>
                            <td>{corners}</td>
                        </tr>
                        <tr>
                            <th> Takes Free Kicks ?</th>
                            <td>{freeKicks}</td>
                        </tr>
                        <tr>
                            <th>Takes Penalties ?</th>
                            <td>{pens}</td>
                        </tr>
                        </table>
                        <table className='statistics'>
                        <tr>
                            <th>ICT Index:</th>
                            <td>{ictIndex}</td>
                        </tr>
                        <tr>
                            <th>ICT per 90:</th>
                            <td>{avgICTPer90}</td>
                        </tr>
                        <tr>
                            <th>Influence:</th>
                            <td>{influence}</td>
                        </tr>
                        <tr>
                            <th>Influence per 90:</th>
                            <td>{avgInfluencePer90}</td>
                        </tr>
                        <tr>
                            <th>Creativity:</th>
                            <td>{avgCreativityPer90}</td>
                        </tr>
                        <tr>
                            <th>Threat:</th>
                            <td>{avgThreatPer90}</td>
                        </tr> 
                        </table>
                        <table className='statistics'>
                        <tr>
                            <th>Goals Conceded:</th>
                            <td>{goalsConceded}</td>
                        </tr>
                        <tr>
                            <th>Goals Conceded per 90:</th>
                            <td>{avgGoalsConcededPer90}</td>
                        </tr>
                        <tr>
                            <th>Cleansheets:</th>
                            <td>{cleanSheets}</td>
                        </tr>
                        <tr>
                            <th>Own Goals:</th>
                            <td>{ownGoals}</td>
                        </tr>
                        <tr>
                            <th>Yellow Cards:</th>
                            <td>{yellowCards}</td>
                        </tr>
                        <tr>
                            <th>Red Cards:</th>
                            <td>{redCards}</td>
                        </tr>
                        </table>
                        
                    </div>
                   
                </div>
            )

        } else {
            return (
                <div className='playerStats'>
                    
                    <div className='player-stuff'>

                        <div className='photoDiv'>
                            <img className='photo' src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${code}.png`} alt="" />
                        </div>
                        <div>
                        <div className='playerInfo'>
                            <h2>{name}</h2>
                            <h3>{team}</h3>
                            <h4>{position}</h4>
                        </div>
                        <div className='generalStats'>
                            <table className='statistics'>
                            <tr>
                            <th>Total Points:</th>
                            <td>{totalPoints}</td>
                            </tr>
                            <tr>
                            <th>Points Per Game:</th>
                            <td>{ppg}</td>
                            </tr>
                            <tr>
                            <th>Points predicted for next fixture</th>
                            <td>{predictedPoints}</td>
                            </tr>
                            <tr>
                            <th>Minutes Played:</th>
                            <td>{minutes}</td>
                            </tr>
                            <tr>
                            <th>Average Minutes Per Game:</th>
                            <td>{avgMinutes}</td>
                            </tr>
                            </table>
                        </div>
                        </div>
                    </div>
                    <div className='bonusStats'>
                        
                        <table className='statistics'>
                        <tr>
                            <th>Saves:</th>
                            <td>{saves}</td>
                        </tr>
                        <tr>
                            <th>Penalty Saves:</th>
                            <td>{pensSaved}</td>
                        </tr>
                        <tr>
                            <th>Goals Conceded:</th>
                            <td>{goalsConceded}</td>
                        </tr>
                        <tr>
                            <th>Goals Conceded per 90:</th>
                            <td>{avgGoalsConcededPer90}</td>
                        </tr>
                        <tr>
                            <th>Cleansheets:</th>
                            <td>{cleanSheets}</td>
                        </tr>
                        <tr>
                            <th>Own Goals:</th>
                            <td>{ownGoals}</td>
                        </tr>
                        </table>
                        <table className='statistics'>
                        <tr>
                            <th>ICT Index:</th>
                            <td>{ictIndex}</td>
                        </tr>
                        <tr>
                            <th>ICT per 90:</th>
                            <td>{avgICTPer90}</td>
                        </tr>
                        <tr>
                            <th>Influence:</th>
                            <td>{influence}</td>
                        </tr>
                        <tr>
                            <th>Influence per 90:</th>
                            <td>{avgInfluencePer90}</td>
                        </tr>
                        <tr>
                            <th>Creativity:</th>
                            <td>{avgCreativityPer90}</td>
                        </tr>
                        <tr>
                            <th>Threat:</th>
                            <td>{avgThreatPer90}</td>
                        </tr> 
                        </table>
                        <table className='statistics'>
                        <tr>
                            <th>Goals:</th>
                            <td>{goals}</td>
                        </tr>
                        <tr>
                            <th>Assists:</th>
                            <td>{assists}</td>
                        </tr>
                        <tr>
                            <th>Yellow Cards:</th>
                            <td>{yellowCards}</td>
                        </tr>
                        <tr>
                            <th>Red Cards:</th>
                            <td>{redCards}</td>
                        </tr>
                        </table>
                    </div>

                    
                </div>
            )
        }
    }

    function renderNames(names) {
        return names.map(n => <option value={n}>{n}</option>)
    }

    function CustomTooltip({ payload, label, active }) {
        if (active) {
          return (
            <div className="custom-tooltip">
              <p className="label">{`${payload[0].payload.name}`}</p>
              <p className="intro">{`${xAxis}: ${payload[0].payload[xAxis]}`}</p>
              <p className="desc">{`${yAxis}: ${payload[0].payload[yAxis]}`}</p>
            </div>
          );
        }
    }
    function rifa (item, array) {
        const index = array.findIndex((i) => i === item)
        array.splice(index, 1)
    }
    
    function renderXAxisData () {
        const data = Object.keys(allData[0])
        rifa("minutes", data)
        rifa("code", data)
        rifa("team", data)
        rifa("position", data)
        rifa("name", data)
        rifa("id", data)
        rifa("player_id", data)
        rifa("takes_corners", data)
        rifa("takes_penalties", data)
        rifa("takes_free_kicks", data)
        rifa("transfers_in", data)
        rifa("transfers_in_this_round", data)
        rifa("transfers_out", data)
        rifa("transfers_out_this_round", data)
        data.unshift("minutes")
        return data.map(n => <option value={n}>{n}</option>)
    }


    function renderYAxisData () {
        const data = Object.keys(allData[0])
        rifa("influence", data)
        rifa("code", data)
        rifa("team", data)
        rifa("position", data)
        rifa("name", data)
        rifa("id", data)
        rifa("player_id", data)
        rifa("takes_corners", data)
        rifa("takes_penalties", data)
        rifa("takes_free_kicks", data)
        rifa("transfers_in", data)
        rifa("transfers_in_this_round", data)
        rifa("transfers_out", data)
        rifa("transfers_out_this_round", data)
        data.unshift("influence")
        return data.map(n => <option value={n}>{n}</option>)
    }

    function handleXAxis(e) {
        setXAxis(e.target.value) 
    }

    function handleYAxis (e) {
        setYAxis(e.target.value)
    }

    function renderChartDiv () {
        setRenderGraph(true)
    }

    function getColorForType (entry) {
        if (entry === playerData) {
            return "#e90052"
        }
        else if (entry === playerDataTwo) {
            return "#e90052"
        }
        else {
            return "#04f5ff"
        }
    }

function handleFilters (e) {
    e.preventDefault()
    setTeamFilter(e.target.teamFilter.value)
    const team = e.target.teamFilter.value
    setPositionFilter(e.target.positionFilter.value)
    const position = e.target.positionFilter.value
    if (team === "all" && position === "all"){
        setGraphData(allData)
    } else if (team !== "all" && position === "all"){
        setGraphData(allData.filter(p => p.team === team))
    } else if (team === "all" && position !== "all"){
        setGraphData(allData.filter(p => p.position === position))
    } else {
        setGraphData(allData.filter(p => p.position === position && p.team === team))
    }
}

    
    return (
        <div>
            <div className='comparePlayers'>
                <div className='player'>
                <div className='dropdowns'>
                <select onInput={handleTeamChoice}>
                    <option>Select Team</option>
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
                <option>Select Player</option>
                    {renderNames(names)}
                </select>
                    </div>
                <div className='playerOne'>
                    {playerData ? renderStats(Object.values(playerData)) :<div className='waiting'><h2>Select a player to view their stats</h2></div> }
                </div>
                </div>
                <div className='player'>
                <div className='dropdowns'>
                <select className='dropdown2' onInput={handleTeamChoiceTwo}>
                <option>Select Team</option>
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
            <select className='dropdown2' onInput={handlePlayerChoiceTwo}>
                <option>Select Player</option>
                {renderNames(namesTwo)}
            </select>
                    </div>
                <div className='playerTwo'>
                    { playerDataTwo ? renderStats(Object.values(playerDataTwo)) : <div className='waiting'><h2>Select a player to view their stats</h2></div> }
                    
                </div>
            </div>
                    </div>
                {renderGraph ? 
            <div className='chartDiv'>
                <div className='yAxis'>
                <select onInput={handleYAxis} id="yAxisSelect">
                    {renderYAxisData()}
        </select >
                </div>
                <div className='graphMain'>
                    <h3>{yAxis} against {xAxis} for {teamFilter} players in {positionFilter} positions</h3>
                    <ResponsiveContainer>
        <ScatterChart
          width={1400}
          height={800}
          >
          <CartesianGrid />
          <XAxis type="number" dataKey={`${xAxis}`} />
          <YAxis type="number" dataKey={`${yAxis}`} />
            <Tooltip content={<CustomTooltip />}/>
          <Scatter name="Player Stats" data={graphData} fill="#8884d8">
          {graphData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColorForType(entry)} />
              ))}
          </Scatter>
        </ScatterChart>
        </ResponsiveContainer>
        <select onInput={handleXAxis} className="axis">
                    {renderXAxisData()}
        </select>
      
        <form className='filters' onSubmit={handleFilters}>
        <h3>Filters:</h3>
        <div className='teamFilter'>
            <p>Team:</p>
      <select name ="teamFilter">
                <option value="all">all</option>
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
            </div>
            <div className='positionFilter'>
                <p>Position:</p>
            <select name ="positionFilter">
                <option value="all">all</option>
                <option value="FW">ATK</option>
                <option value="MD">MID</option>
                <option value="DF">DEF</option>
                <option value="GK">GK</option>
            </select>
            </div>
            <div className='submitDiv'>
            <input type="submit" value="apply filters" id='submit' className='button'/>
            </div>
            </form>
           </div> </div> :<div className='chartButton'><button onClick={renderChartDiv} hidden = {renderGraph} className="button">Full league comparison</button></div>}
            </div>
        
    )
}

export default Stats
