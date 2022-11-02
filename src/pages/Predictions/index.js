import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { DreamTeam, StatsTable } from '../../components'
import './style.css'
import axios from 'axios'

const Predictions = () => {
  const [allData, setAllData] = useState([])

  useEffect(() => {
    async function storePlayerData() {
      const storeData = await getPlayerData()
      setAllData(storeData)
    }
    storePlayerData()
  }, [])

  const getPlayerData = async () => {
    try {
      const data = await axios.get('https://fantaisyfootball.herokuapp.com/allstats')
      return data.data
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='predictions'>
      <DreamTeam allData={allData}/>
      <StatsTable allData={allData} />
    </div>
  )
}

export default Predictions 
