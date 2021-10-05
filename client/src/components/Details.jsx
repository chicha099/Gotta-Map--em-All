import React from "react";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GetPokemonById } from "../actions";
import { useEffect } from "react";
import './Details.css';

export default function Details() {
    const dispatch = useDispatch();
    const pokeDetails = useSelector((state) => state.detail);
    const idDetail = useSelector((state) => state.id);

    useEffect(() => {
        dispatch(GetPokemonById(idDetail));
    }, [dispatch]);

    return (
        <div className='allDet'>
            {pokeDetails.length !== 0 ? (
                <div>
                    <div id='mainDetail' className='mainDetail'>
                        <div id='bigCard' className='bigCard'>
                            <h1>{pokeDetails[0].name[0].toUpperCase() + pokeDetails[0].name.slice(1) || pokeDetails[0].Nombre[0].toUpperCase() + pokeDetails[0].Nombre.slice(1)}</h1>
                            <div className='imgDetailDiv'>
                                <div className='specImg'>
                                    {/* <img className='imgDetail' src={pokeDetails[0].img} alt="" /> */}
                                </div>
                                <div className='detailedInfo'>
                                    {/* <h3>Types: {pokeDetails[0].types[0][0].toUpperCase() + pokeDetails[0].types[0].slice(1) + " " + pokeDetails[0].types[1][0].toUpperCase() + pokeDetails[0].types[1].slice(1)}</h3>
                                    <h3> HP: {pokeDetails[0].hp}</h3>
                                    <h3> Attack: {pokeDetails[0].force}</h3>
                                    <h3> Defense: {pokeDetails[0].defense}</h3>
                                    <h3> Weight: {pokeDetails[0].weight}</h3>
                                    <h3> Height: {pokeDetails[0].height}</h3> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <h1>ESTOY CARGANDO</h1>
                </div>
            )}
        </div>
    )
};

