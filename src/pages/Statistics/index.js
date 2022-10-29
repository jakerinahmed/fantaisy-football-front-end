import React, {useState} from 'react'
import axios from 'axios'
import { useEffect } from 'react'


const Stats = () => {
    const [allData, setAllData] = useState([])
    const [playerCode, setPlayerCode] = useState(58822)
    // const [summary, setSummary] = useState("")
    useEffect(() => {
        const getAllData = async () => {
                const response = await axios.get(`https://fantaisyfootball.herokuapp.com/allstats`)
                setAllData(response.data)
            }
        getAllData()
    },[])
    const [names, setNames] = useState(["person"])
    const [playerData, setPlayerData] = useState([{}])
    // const handleTeamChoice = async (e) => {
    //         const team = e.target.value
    //         const { data }= await axios.get(`https://fantaisyfootball.herokuapp.com/teams/${team}`)
    //         setTeamData(data)
    //         const names = []
    //         for (let i = 0; i < data.length ; i ++) {
    //             names.push(data[i].name)
    //         }
    //         console.log(names)    
    //         setNames(names)
    // }

    const handleTeamChoice = async (e) => {
        const team = e.target.value
        const playerNames = allData.filter(p => p.team === team)
        const options = []
        for (let i = 0; i < playerNames.length ; i ++) {
            options.push(playerNames[i].name)
        }   
        setNames(options)
}
    const handlePlayerChoice = (e) => {
        const name = e.target.value
        const data_array = allData.filter(p => p.name === name);
        const data = data_array[0]
        setPlayerData(data)
        setPlayerCode(data.code)
    }
    // const renderStats = (playerData) => {
    //     console.log(playerData)
    //     Object.keys(playerData).forEach(key => {
    //         return (
    //             <p> {key}, {playerData[key]}</p>
    //             );
    //       });
    //     }


    function renderNames (names) {
        return names.map(n => <option value={n}>{n}</option>)
    }
  return (
    <div>
        <select onInput={handleTeamChoice}>
            <option value="Arsenal">Arsenal</option>
            <option value="Aston Villa FC">Aston Villa FC</option>
            <option value="Bournemouth AFC">Bournemouth AFC</option>
            <option value="Brentford">Brentford</option>
            <option value="Brighton & Hove Albion">Brighton & Hove Albion</option>
            <option value="Chelsea">Chelsea</option>
            <option value="Crystal Palace">Crystal Palace</option>
            <option value="Everton FC">Everton FC</option>
            <option value="Fulham">Fulham</option>
            <option value="Leicester City FC">Leicester City FC</option>
            <option value="Leeds United">Leeds United</option>
            <option value="Liverpool FC">Liverpool FC</option>
            <option value="Manchester City FC">Manchester City FC</option>
            <option value="Manchester United FC">Manchester United FC</option>
            <option value="Newcastle United">Newcastle United</option>
            <option value="Nottingham Forest">Nottingham Forest</option>
            <option value="Southampton FC">Southampton FC</option>
            <option value="Tottenham Hotspur FC">Tottenham Hotspur FC</option>
            <option value="West Ham United">West Ham United</option>
            <option value="Wolverhampton Wanderers">Wolverhampton Wanderers</option>
        </select>
        <select onInput={handlePlayerChoice}>
            {renderNames(names)}
        </select>
        <div>
            <img src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${playerCode}.png`} alt="" />
            {/* {renderStats(playerData[0])} */}
        </div>
    </div>
  )
}

export default Stats
