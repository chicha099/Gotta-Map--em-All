import react from 'react';
import './Nav.css';

export default function Nav() {
    return (
        <div className='NavDiv'>
            <input type="search" className='Input' />
            <button className='ButtonNav'>Search</button>
        </div>
    )
};