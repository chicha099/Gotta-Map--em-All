import react from 'react';
import { Link } from 'react-router-dom';
import { changePopup, idForDetail } from '../actions';
import { useDispatch } from 'react-redux';
import './Card.css';

export default function Card({ name, types, img, id }) {
    const dispatch = useDispatch();
    let nameF = name[0].toUpperCase() + name.slice(1);
    let bothTypes = { types };
    let type1 = bothTypes.types[0];
    let type1F = type1[0].toUpperCase() + type1.slice(1);
    let type2 = bothTypes.types[1];
    if (type2) {
        type2 = type2[0].toUpperCase() + type2.slice(1);
    }

    function handlePopup(bool, id) {
        // dispatch(idForDetail(id));
        dispatch(changePopup(bool, id))
    }

    return (
        <span onClick={() => handlePopup([true, id])}>
            <div className='cardDiv'>
                <div className='Card'>
                    <img src={img} alt="img not found" className='Img' />
                    <h5>{nameF}</h5>
                    <h6>{type1F} {type2}</h6>
                </div>
            </div>
        </span>
    )
};

