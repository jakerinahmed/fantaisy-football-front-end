import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './style.css'

const StatsTable = ({ allData }) => {

    const [orderedPlayers, setOrderedPlayers] = useState([])
    const [teamFilter, setTeamFilter] = useState("All")
    const [positionFilter, setPositionFilter] = useState("Any")
    const [tableFilter, setTableFilter] = useState("PP")

    useEffect(() => {
        async function addToTable() {
            const tableData = await allData
            // console.log(tableData)
            let byPredictedPoints = tableData
            // console.log(byPredictedPoints)
            byPredictedPoints.sort((a, b) => {
                return b.predicted_points - a.predicted_points;
            });
            setOrderedPlayers(byPredictedPoints)
        }
        addToTable()
    }, [allData])

    function handleFilters(e) {
        e.preventDefault()
        setTeamFilter(e.target.teamFilter.value)
        const team = e.target.teamFilter.value
        setPositionFilter(e.target.positionFilter.value)
        const position = e.target.positionFilter.value
        setTableFilter(e.target.tableFilter.value)
        const sortFilter = e.target.tableFilter.value

        if (team !== "All" && position !== "Any") {
            if (sortFilter === "PP per Cost") {
                const filteredPlayers = allData.filter(p => p.position === position && p.team === team)
                setOrderedPlayers(filteredPlayers.sort((a, b) => {
                    return (b.predicted_points / b.cost) - (a.predicted_points / a.cost);
                }))
            } else if (sortFilter === "Cost") {
                const filteredPlayers = allData.filter(p => p.position === position && p.team === team)
                setOrderedPlayers(filteredPlayers.sort((a, b) => {
                    return b.cost - a.cost;
                }))
            } else {
                setOrderedPlayers(allData.filter(p => p.position === position && p.team === team))
            }

        } else if (team !== "All" && position === "Any") {
            if (sortFilter === "PP per Cost") {
                const filteredPlayers = allData.filter(p => p.team === team)
                setOrderedPlayers(filteredPlayers.sort((a, b) => {
                    return (b.predicted_points / b.cost) - (a.predicted_points / a.cost);
                }))
            } else if (sortFilter === "Cost") {
                const filteredPlayers = allData.filter(p => p.team === team)
                setOrderedPlayers(filteredPlayers.sort((a, b) => {
                    return b.cost - a.cost;
                }))
            } else {
                setOrderedPlayers(allData.filter(p => p.team === team))
            }

        } else if (team === "All" && position !== "Any") {
            if (sortFilter === "PP per Cost") {
                const filteredPlayers = allData.filter(p => p.position === position)
                setOrderedPlayers(filteredPlayers.sort((a, b) => {
                    return (b.predicted_points / b.cost) - (a.predicted_points / a.cost);
                }))
            } else if (sortFilter === "Cost") {
                const filteredPlayers = allData.filter(p => p.position === position)
                setOrderedPlayers(filteredPlayers.sort((a, b) => {
                    return b.cost - a.cost;
                }))
            } else {
                setOrderedPlayers(allData.filter(p => p.position === position))
            }

        } else {
            if (sortFilter === "PP per Cost") {
                setOrderedPlayers(allData.sort((a, b) => {
                    return (b.predicted_points / b.cost) - (a.predicted_points / a.cost);
                }))
            } else if (sortFilter === "Cost") {
                setOrderedPlayers(allData.sort((a, b) => {
                    return b.cost - a.cost;
                }))
            } else {
                setOrderedPlayers(allData.sort((a, b) => {
                    return b.predicted_points - a.predicted_points;
                }))
            }
        }
    }

    return (
        <div>
            <form role='filters' onSubmit={handleFilters}>
                <div className='filters'>
                    <div role='team'>
                        <label className='filter-padding' for="team">Team</label>
                        <select className='filter-drop-down' name="teamFilter" id="team">
                            <option value="All">All</option>
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

                    <div role='position'>
                        <label className='filter-padding' for="position">Position</label>
                        <select className='filter-drop-down' name="positionFilter" id="position">
                            <option value="Any">Any</option>
                            <option value="GK">GK</option>
                            <option value="DF">DF</option>
                            <option value="MF">MF</option>
                            <option value="FW">FW</option>
                        </select>
                    </div>

                    <div role='table-headers'>
                        <label className='filter-padding' for='table-headers'>Sort by</label>
                        <select className='filter-drop-down' name="tableFilter" id="tableFilter">
                            <option value="PP">Predicted Points</option>
                            <option value="Cost">Cost</option>
                            <option value="PP per Cost">PP per Cost</option>
                        </select>
                    </div>
                    <input className='button' type='submit' value='Apply filters' />
                </div>

            </form>

            <div className='table-rows'>
                <table className='sortable'>
                    <tr className='head'>
                        <th>Player</th>
                        <th>Team</th>
                        <th>Position</th>
                        <th>Cost</th>
                        <th>Predicted Points</th>
                        <th>PP per Cost</th>
                    </tr>
                    {orderedPlayers.map(player => {
                        return <tr><td>{player.name}</td>
                            <td>{player.team}</td>
                            <td>{player.position}</td>
                            <td>£{player.cost}m</td>
                            <td>{player.predicted_points}</td>
                            <td>{Math.round(10 * player.predicted_points / player.cost) / 10}</td>
                        </tr>
                    })}
                </table>
            </div>
        </div>
    )
}

export default StatsTable
