import react from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Nav from './Nav';
import Sidebar from './Sidebar';
import './Home.css'

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);

    useEffect(() => {
        dispatch(getPokemons());
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemons());
    }

    return (
        <div>
            <div id='nav'>
                <Nav />
            </div>
            <div id='main' className='MainDiv'>
                <div className='SidebarDiv'>
                    <Sidebar />
                </div>
                <div>
                    <button onClick={e => { handleClick(e) }}>
                        Load Pokemons Again
                    </button>
                    <div>
                        {
                            allPokemons && allPokemons.map(p => {
                                return (
                                    <div>
                                        <Card name={p.name} types={p.types} img={p.img} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}