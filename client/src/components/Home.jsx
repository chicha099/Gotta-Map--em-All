import react from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Nav from './Nav';
import Sidebar from './Sidebar';
import Pagination from './Pages';
import './Home.css';

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(9);
    const lastPokemonIndex = currentPage * pokemonsPerPage;
    const firstPokemonIndex = lastPokemonIndex - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(firstPokemonIndex, lastPokemonIndex)

    const pages = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

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
                            currentPokemons && currentPokemons.map(p => {
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
            <div>
                <Pagination
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    pages={pages}
                />
            </div>
        </div>
    )
}