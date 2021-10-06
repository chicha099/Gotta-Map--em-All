import react from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, orderPokemonsByName, orderPokemonsByForce } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Nav from './Nav';
import Sidebar from './Sidebar';
import Pagination from './Pages';
import Details from './Details';
import './Home.css';

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const popupState = useSelector((state) => state.popup);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(9);
    const lastPokemonIndex = currentPage * pokemonsPerPage;
    const firstPokemonIndex = lastPokemonIndex - pokemonsPerPage;
    const currentPokemons = Array.isArray(allPokemons) ? allPokemons.slice(firstPokemonIndex, lastPokemonIndex) : [allPokemons];

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

    function handleOrderByName(e) {
        dispatch(orderPokemonsByName(e.target.value));
    }

    function handleOrderByForce(e) {
        dispatch(orderPokemonsByForce(e.target.value));
    }

    console.log(currentPokemons)
    return (
        <div>
            <Nav />
            <div id='main' className='MainDiv'>
                <Sidebar />
                <div>
                    <select onChange={e => handleOrderByName(e)} className='Font'>
                        <option value="alpha-Asc">A-Z</option>
                        <option value="alpha-Desc">Z-A</option>
                    </select>
                    <select onChange={e => handleOrderByForce(e)} className='Font'>
                        <option value="force-Asc">FORCE ASC</option>
                        <option value="force-Desc">FORCE DESC</option>
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
                                            <Card name={p.name} types={p.types} img={p.img} id={p.id} />
                                        </div>
                                    )
                                }
                                else if(p.tipos){
                                    let nameDb = p.Nombre;
                                    let typesDb = [];
                                    let imgDb = p.Imagen;
                                    let idDb = p.ID;
                                    p.tipos.forEach(t => {

                                        typesDb.push(t.name)
                                    });
                                    return (
                                        <div>
                                            <Card name={nameDb} types={typesDb} img={imgDb} id={idDb} />
                                        </div>
                                    )
                                }
                                else{
                                    return (<h1 className='notFound'>Searched Pokemon does not exist!</h1>)
                                }
                            })
                        }
                    </div>
                </div>
            </div>
            <div>
                {popupState ? (
                    <Details />
                ) : ("")}
                <Pagination
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    pages={pages}
                />
            </div>
        </div>
    )
}