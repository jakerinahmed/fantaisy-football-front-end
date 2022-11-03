import React from 'react'
import './style.css'

const PlayerCard = (props) => {
    return (
        
        <div className='playercard' style={{border: props.name === props.optimal.in || props.name === props.optimal.out ? '5px dashed red': 'none'}}>
            <img className='playerPhoto' src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${props.code}.png`} alt={`${props.name}`} /> 
            <p> {props.name}</p>
            <p>points:{props.points}</p>
        </div>
    )
}

export default PlayerCard
