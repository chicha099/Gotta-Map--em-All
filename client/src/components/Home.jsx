import react from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';

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
            {/* <Link to='#'>Create Pokemon</Link> */}
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
    )
}