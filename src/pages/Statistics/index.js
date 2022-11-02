import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

import './style.css'


const Stats = () => {
    const [allData, setAllData] = useState([])
    const [graphData, setGraphData] = useState([])
    const [comparing, setComparing] = useState(false)
    const [isHidden, setIsHidden] = useState(true)
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
    const [playerData, setPlayerData] = useState(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",""])
    const [playerDataTwo, setPlayerDataTwo] = useState(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",""])
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
        setComparing(true)
    }

    const renderStats = ([assists, avgAssistsPer90, avgCreativityPer90, avgGoalsConcededPer90, avgGoalsPer90, avgICTPer90, avgInfluencePer90, avgMinutes, avgThreatPer90, bonusPoints, chanceOfPlaying, cleanSheets, code, cost, creativity, goals, goalsConceded, ictIndex, id, influence, minutes, name, ownGoals, pensMissed, pensSaved, playerID, ppg, position, predictedPoints, redCards, saves, selectedPerc, corners, freeKicks, pens, team, threat, totalPoints, transfersIn, transfersInRound, transfersOut, transfersOutRound, yellowCards]) => {
        if (position === "FW") {
            return (
                <div className='playerStats'>
                    <div className='player-stuff'>

                        <div>
                            <img src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${code}.png`} alt="" />
                        </div>
                        
                        <div className='playerInfo'>
                            <h2>{name}</h2>
                            <h3>{position}</h3>
                            <h4>{team}</h4>
                        </div>
                    </div>
                    <div className='bonusStats'>
                        <p>Total Points: {totalPoints}</p>
                        <p>Points Per Game: {ppg}</p>
                        <p>Predicted Points for next fixture: {predictedPoints}</p>
                        <p>Cost: {cost}</p>
                        <p>Goals: {goals}</p>
                        <p>Average Goals per 90: {avgGoalsPer90}</p>
                        <p>Assists: {assists}</p>
                        <p>Average Assists per 90: {avgAssistsPer90}</p>
                        <p>Goals Conceded: {goalsConceded}*</p>
                        <p>Average Goals Conceded per 90: {avgGoalsConcededPer90}</p>
                        <p>Clean Sheets: {cleanSheets}*</p>
                        <p>Bonus Points: {bonusPoints}</p>
                        <p>Minutes Played: {minutes}</p>
                        <p>Average Minutes Per Game: {avgMinutes}</p>
                        <p>Selected by Percentage: {selectedPerc}%</p>
                        <p>Influence: {influence}</p>
                        <p>Average Influence per 90: {avgInfluencePer90}</p>
                        <p>Creativity: {creativity}</p>
                        <p>Average Creativity per 90: {avgCreativityPer90}</p>
                        <p>Threat: {threat}</p>
                        <p>Average Threat per 90: {avgThreatPer90}</p>
                        <p>ICT Index: {ictIndex}</p>
                        <p>Average ICT Index per 90: {avgICTPer90}</p>
                        <p>Pens Missed: {pensMissed}</p>
                        <p>Takes Corners: {corners}</p>
                        <p>Takes Free Kicks: {freeKicks}</p>
                        <p>Takes Penalties: {pens}</p>
                        <p>Own Goals: {ownGoals}</p>
                        <p>Yellow Cards: {yellowCards}</p>
                        <p>Red Cards: {redCards}</p>
                        <p id='asterix'>* Marked stats dont affect players points</p>
                    </div>
                   
                </div>
            )

        } else if (position === "MD") {
            return (
                <div className='playerStats'>
                    <div className='player-stuff'>
                        <div>
                            <img src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${code}.png`} alt="" />
                        </div>
                        
                        <div className='playerInfo'>
                            <h2>{name}</h2>
                            <h3>{position}</h3>
                            <h4>{team}</h4>
                        </div>
                    </div>
                    <div className='bonusStats'>
                        <p>Total Points: {totalPoints}</p>
                        <p>Points Per Game: {ppg}</p>
                        <p>Predicted Points for next fixture: {predictedPoints}</p>
                        <p>Cost: {cost}</p>
                        <p>Goals: {goals}</p>
                        <p>Average Goals per 90: {avgGoalsPer90}</p>
                        <p>Assists: {assists}</p>
                        <p>Average Assists per 90: {avgAssistsPer90}</p>
                        <p>Goals Conceded: {goalsConceded}</p>
                        <p>Average Goals Conceded per 90: {avgGoalsConcededPer90}</p>
                        <p>Clean Sheets: {cleanSheets}</p>
                        <p>Bonus Points: {bonusPoints}</p>
                        <p>Minutes Played: {minutes}</p>
                        <p>Average Minutes Per Game: {avgMinutes}</p>
                        <p>Selected by Percentage: {selectedPerc}%</p>
                        <p>Influence: {influence}</p>
                        <p>Average Influence per 90: {avgInfluencePer90}</p>
                        <p>Creativity: {creativity}</p>
                        <p>Average Creativity per 90: {avgCreativityPer90}</p>
                        <p>Threat: {threat}</p>
                        <p>Average Threat per 90: {avgThreatPer90}</p>
                        <p>ICT Index: {ictIndex}</p>
                        <p>Average ICT Index per 90: {avgICTPer90}</p>
                        <p>Pens Missed: {pensMissed}</p>
                        <p>Takes Corners: {corners}</p>
                        <p>Takes Free Kicks: {freeKicks}</p>
                        <p>Takes Penalties: {pens}</p>
                        <p>Own Goals: {ownGoals}</p>
                        <p>Yellow Cards: {yellowCards}</p>
                        <p>Red Cards: {redCards}</p>
                    </div>
                   
                </div>
            )
        } else if (position === "DF") {
            return (
                <div className='playerStats'>
                    <div className='player-stuff'>

                        <div>
                            <img src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${code}.png`} alt="" />
                        </div>
                        
                        <div className='playerInfo'>
                            <h2>{name}</h2>
                            <h3>{position}</h3>
                            <h4>{team}</h4>
                        </div>
                    </div>
                    <div className='bonusStats'>
                    <p>Total Points: {totalPoints}</p>
                        <p>Points Per Game: {ppg}</p>
                        <p>Predicted Points for next fixture: {predictedPoints}</p>
                        <p>Cost: {cost}</p>
                        <p>Goals: {goals}</p>
                        <p>Average Goals per 90: {avgGoalsPer90}</p>
                        <p>Assists: {assists}</p>
                        <p>Average Assists per 90: {avgAssistsPer90}</p>
                        <p>Goals Conceded: {goalsConceded}</p>
                        <p>Average Goals Conceded per 90: {avgGoalsConcededPer90}</p>
                        <p>Clean Sheets: {cleanSheets}</p>
                        <p>Bonus Points: {bonusPoints}</p>
                        <p>Minutes Played: {minutes}</p>
                        <p>Average Minutes Per Game: {avgMinutes}</p>
                        <p>Selected by Percentage: {selectedPerc}%</p>
                        <p>Influence: {influence}</p>
                        <p>Average Influence per 90: {avgInfluencePer90}</p>
                        <p>Creativity: {creativity}</p>
                        <p>Average Creativity per 90: {avgCreativityPer90}</p>
                        <p>Threat: {threat}</p>
                        <p>Average Threat per 90: {avgThreatPer90}</p>
                        <p>ICT Index: {ictIndex}</p>
                        <p>Average ICT Index per 90: {avgICTPer90}</p>
                        <p>Pens Missed: {pensMissed}</p>
                        <p>Takes Corners: {corners}</p>
                        <p>Takes Free Kicks: {freeKicks}</p>
                        <p>Takes Penalties: {pens}</p>
                        <p>Own Goals: {ownGoals}</p>
                        <p>Yellow Cards: {yellowCards}</p>
                        <p>Red Cards: {redCards}</p>
                    </div>
                    
                </div>
            )
        } else {
            return (
                <div className='playerStats'>
                    
                    <div className='player-stuff'>

                        <div>
                            <img src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${code}.png`} alt="" />
                        </div>
                        <div className='playerInfo'>
                            <h2>{name}</h2>
                            <h3>{position}</h3>
                            <h4>{team}</h4>
                        </div>
                    </div>
                    <div className='bonusStats'>
                        <p>Total Points: {totalPoints}</p>
                        <p>Points Per Game: {ppg}</p>
                        <p>Cost: {cost}</p>
                        <p>Saves: {saves}</p>
                        <p>Pens Saved: {pensSaved}</p>
                        <p>Clean Sheets: {cleanSheets}</p>
                        <p>Goals Conceded: {goalsConceded}</p>
                        <p>Average Goals Conceded per 90: {avgGoalsConcededPer90}</p>
                        <p>Bonus Points: {bonusPoints}</p>
                        <p>Goals: {goals}</p>
                        <p>Assists: {assists}</p>
                        <p>Minutes Played: {minutes}</p>
                        <p>Selected by Percentage: {selectedPerc}%</p>
                        <p>Influence: {influence}</p>
                        <p>Average Influence per 90: {avgInfluencePer90}</p>
                        <p>Creativity: {creativity}</p>
                        <p>Average Creativity per 90: {avgCreativityPer90}</p>
                        <p>Threat: {threat}</p>
                        <p>Average Threat per 90: {avgThreatPer90}</p>
                        <p>ICT Index: {ictIndex}</p>
                        <p>Average ICT Index per 90: {avgICTPer90}</p>
                        <p>Own Goals: {ownGoals}</p>
                        <p>Yellow Cards: {yellowCards}</p>
                        <p>Red Cards: {redCards}</p>
                    </div>

                    
                </div>
            )
        }
    }
    function renderDropdown () {
        setIsHidden(false)
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
            <div className='dropdowns'>
                <div>
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
                {renderNames(names)}
            </select>
            </div>
            <div>
            <select hidden = {isHidden} className='dropdown2' onInput={handleTeamChoiceTwo}>
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
            <select hidden = {isHidden} className='dropdown2' onInput={handlePlayerChoiceTwo}>
                {renderNames(namesTwo)}
            </select>
            </div>
            </div>
            <div className='comparePlayers'>
                <div className='playerOne'>
                    {renderStats(Object.values(playerData))}
                </div>
                <div className='playerTwo'>
                    {comparing ? renderStats(Object.values(playerDataTwo)) :
                    <button  hidden = {!isHidden} className='compareBtn' onClick={renderDropdown}>Add second player</button>}
                </div>
            </div>
                {renderGraph ? 
            <div className='chartDiv'>
                <div className='yAxis'>
                <select onInput={handleYAxis}>
                    {renderYAxisData()}
        </select>
                </div>
                <div className='graphMain'>
                    <h3>{yAxis} against {xAxis} for {teamFilter} players in {positionFilter} positions</h3>
        <ScatterChart
          width={1400}
          height={500}
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
        <select onInput={handleXAxis}>
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
           </div> </div> : <button onClick={renderChartDiv} hidden = {renderGraph} className="button">Compare to the rest of the league</button>}
      </div>
            
        
    )
}

export default Stats
