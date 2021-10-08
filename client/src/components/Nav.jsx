import react from 'react';
import { searchName } from '../actions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(searchName(name))
    }

    return (
        <div className='NavDiv'>

            <Link to='/home' className='Logo'>
                <img src="./img/pokelogo.png" alt="" />
                <div className='TitleNav'>
                    <h2>HENRY</h2>
                </div>
            </Link>
            <Link to='/create' className='CreateNav'>
                <h2> Create </h2>
                <h2> Pokemon </h2>
            </Link>
            <Link to='/about' className='CreateNav'>
                <h2>About</h2>
            </Link>
            <input
                type='text'
                className='Input'
                placeholder='Search...'
                onChange={(e) => handleInputChange(e)}
            />
            <button
                className='ButtonNav'
                type='submit'
                onClick={(e) => handleSubmit(e)}
            >SEARCH</button>
        </div>
    )
};