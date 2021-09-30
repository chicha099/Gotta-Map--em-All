import react from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Nav from './Nav';
import Sidebar from './Sidebar';
import './Home.css';

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
            <Nav />
            <div id='main' className='MainDiv'>
                <Sidebar />
                <div>
                    <select>
                        <option value="alpha-Asc">A-Z</option>
                        <option value="alpha-Desc">Z-A</option>
                        <option value="fuerza-Asc">Fuerza Asc</option>
                        <option value="fuerza-Desc">Fuerza Desc</option>
                    </select>
                    <button onClick={e => { handleClick(e) }}>
                        Load Pokemons Again
                    </button>
                    <div id="pokemons" className='Pokemons'>
                        {
                            allPokemons && allPokemons.map(p => {
                                if (p.types) {
                                    return (
                                        <div>
                                            <Card name={p.name} types={p.types} img={p.img} />
                                        </div>
                                    )
                                }
                                else {
                                    let nameDb = p.Nombre;
                                    let typesDb = [];
                                    let imgDb = p.Imagen;
                                    p.tipos.forEach(t => {
                                        typesDb.push(t.name)
                                    });
                                    return (
                                        <div>
                                            <Card name={nameDb} types={typesDb} img={imgDb} />
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='pageMarkers'>
                1 2 3 4 5 6 7 8 9
            </div>
        </div>
    )
}