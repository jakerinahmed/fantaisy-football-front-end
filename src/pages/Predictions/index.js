import React, { useEffect, useState } from 'react'
import { DreamTeam, StatsTable } from '../../components'
import './style.css'
import axios from 'axios'

const Predictions = () => {
  let [product, setproduct] = useState([]);
  let [change, setChange] = useState(true);

async function fetchData() {
    let response = await axios(
      `https://fantaisyfootball.herokuapp.com/allstats`
    );
    let user = await response.data;
    setproduct(user);
    
    console.log(product);
    setChange(!change)
  }

  // useEffect(async () => {
  //   let response = await axios(
  //     `https://fantaisyfootball.herokuapp.com/allstats`
  //   );
  //   let user = await response.data;
  //   setproduct(user);
    
  //   console.log(product);
    
  // },[product]); 
  
  return (
    <div className='predictions'>
      <button onClick={() => console.log(product)}>Get stats</button>
        <DreamTeam/>
        <StatsTable/>
    </div>
  )
}

export default Predictions 
