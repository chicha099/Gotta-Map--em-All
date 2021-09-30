import react from 'react';
import './Card.css';

export default function Card({ name, types, img }) {
    let bothTypes = { types };
    let type1 = bothTypes.types[0];
    let type2 = bothTypes.types[1];
    return (
        <div className='cardDiv'>
            <div className='Card'>
                <img src={img} alt="img not found" width="150px" height="150px" />
                <h5>{name}</h5>
                <h6>{type1} {type2}</h6>
            </div>
        </div>
    )
};