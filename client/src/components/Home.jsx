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
    const allTypes = useSelector((state) => state.types);
    const currentPage = useSelector((state) => state.page);
    const pokemonsPerPage = 9;
    const lastPokemonIndex = currentPage * pokemonsPerPage;
    const firstPokemonIndex = lastPokemonIndex - pokemonsPerPage;
    const currentPokemons = Array.isArray(allPokemons) ? allPokemons.slice(firstPokemonIndex, lastPokemonIndex) : [allPokemons];



    useEffect(() => {
        dispatch(getPokemons());
    }, [dispatch]);

    function handleOrderByName(e) {
        dispatch(orderPokemonsByName(e.target.value));
    }

    function handleOrderByForce(e) {
        dispatch(orderPokemonsByForce(e.target.value));
    }

    return (
        <div>
            {currentPokemons.length > 0 || allTypes.length > 0 ? (
                <div>
                    <Nav />
                    <div id='main' className='MainDiv'>
                        <Sidebar />
                        <div className='fixPages'>
                            <div className='selectHome'>
                                <select onChange={e => handleOrderByName(e)} className='Font'>
                                    <option value="" selected disabled hidden>Sort</option>
                                    <option className='optionsHome' value="alpha-Asc">A-Z</option>
                                    <option className='optionsHome' value="alpha-Desc">Z-A</option>
                                </select>
                                <select onChange={e => handleOrderByForce(e)} className='Font'>
                                    <option value="" selected disabled hidden>Sort Force</option>
                                    <option className='optionsHome' value="force-Asc">FORCE ASC</option>
                                    <option className='optionsHome' value="force-Desc">FORCE DESC</option>
                                </select>
                            </div>
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
                                        else if (p.tipos) {
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
                                        else {
                                            return (<h1 className='notFound'>The searched pokemon does not exist!</h1>)
                                        }
                                    })
                                }
                            </div>
                        </div>
                        <Pagination
                            pokemonsPerPage={pokemonsPerPage}
                            allPokemons={allPokemons.length}
                        />
                    </div>
                    <div>
                        {popupState ? (
                            <Details />
                        ) : ("")}

                    </div>

                </div>
            ) :
                <div className='loadingHome'>
                    <img className='loadingMew' src="https://media3.giphy.com/media/IQebREsGFRXmo/200.gif" alt="" />
                    <h2>Completing Pokedex...</h2>
                </div>
            }
        </div>
    )
}