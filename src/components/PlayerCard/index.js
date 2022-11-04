import React from 'react'
import './style.css'

const PlayerCard = (props) => {
    return (
        
        <div className='playercard'>
            <img className='playerPhoto' src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.code}.png`} alt={`${props.name}`} /> 

            <p role="playerName"> {props.name}</p>
            <p role="playerPoints">points:{props.points}</p>
        </div>
    )
}

export default PlayerCard
