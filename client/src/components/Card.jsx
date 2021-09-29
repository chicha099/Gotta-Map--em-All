import react from 'react';

export default function Card({ name, types, img }) {
    let bothTypes = { types };
    let type1 = bothTypes.types[0];
    let type2 = bothTypes.types[1];
    return (
        <div>
            <img src={img} alt="img not found" width="200px" height="200px" />
            <h5>{name}</h5>
            <h6>{type1} {type2}</h6>
        </div>
    )
};