import React from 'react'

const PlayerCard = (props) => {
    return (
        <div className='playercard' style={{border: props.name === props.optimal.in || props.name === props.optimal.out ? '5px dashed red': 'none'}}> 
            <p> {props.name}</p>
            <p>points:{props.points}</p>
        </div>
    )
}

export default PlayerCard