import React from 'react'

const PlayerCard = (props) => {
    return (
        
        <div className='playercard' > 
            <p> {props.name}</p>
            <p>points:{props.points}</p>
        </div>
    )
}

export default PlayerCard