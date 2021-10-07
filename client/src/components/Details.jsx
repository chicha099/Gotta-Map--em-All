import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GetPokemonById, changePopup } from "../actions";
import { useEffect } from "react";
import './Details.css';

export default function Details() {
    const dispatch = useDispatch();
    const pokeDetails = useSelector((state) => state.detail);
    const idDetail = useSelector((state) => state.id);

    useEffect(() => {
        dispatch(GetPokemonById(idDetail));
    }, [dispatch]);


    function handleClickPopup(bool) {
        dispatch(changePopup(bool))
    }
    return (
        <div className='allDet'>
            <div className='darken'></div>
            {pokeDetails.length !== 0 ? (
                <div>
                    <div id='mainDetail' className='mainDetail'>
                        <div id='bigCard' className='bigCard'>
                            <button onClick={() => handleClickPopup(false)} className='closeBut'>X</button>
                            {
                                pokeDetails.Nombre ?
                                    <h1>{pokeDetails.Nombre[0].toUpperCase() + pokeDetails.Nombre.slice(1)}</h1> :
                                    <h1>{pokeDetails[0].name[0].toUpperCase() + pokeDetails[0].name.slice(1)}</h1>
                            }
                            <div className='imgDetailDiv'>
                                <div className='specImg'>
                                    {
                                        pokeDetails.Imagen ?
                                            <img className='imgDetail' src={pokeDetails.Imagen} alt="" height='263px'/> :
                                            <img className='imgDetail' src={pokeDetails[0].img} alt="" />
                                    }

                                </div>
                                <div className='detailedInfo'>
                                    {
                                        pokeDetails.tipos ?
                                            <h3 className='stats'>{pokeDetails.tipos[0].name[0].toUpperCase() + pokeDetails.tipos[0].name.slice(1) + " " + pokeDetails.tipos[1].name[0].toUpperCase() + pokeDetails.tipos[1].name.slice(1)}</h3> :
                                            (pokeDetails[0].types.length === 2 ? <h3 className='stats'>{pokeDetails[0].types[0][0].toUpperCase() + pokeDetails[0].types[0].slice(1) + " " + pokeDetails[0].types[1][0].toUpperCase() + pokeDetails[0].types[1].slice(1)}</h3> :
                                                <h3 className='stats'>{pokeDetails[0].types[0][0].toUpperCase() + pokeDetails[0].types[0].slice(1)}</h3>)
                                    }
                                    {
                                        pokeDetails.Vida ?
                                            <h3 className='stats'> HP: {pokeDetails.Vida}</h3> :
                                            <h3 className='stats'> HP: {pokeDetails[0].hp}</h3>
                                    }
                                    {
                                        pokeDetails.Fuerza ?
                                            <h3 className='stats'> Force: {pokeDetails.Fuerza}</h3> :
                                            <h3 className='stats'> Force: {pokeDetails[0].force}</h3>
                                    }
                                    {
                                        pokeDetails.Defensa ?
                                            <h3 className='stats'> Defense: {pokeDetails.Defensa}</h3> :
                                            <h3 className='stats'> Defense: {pokeDetails[0].defense}</h3>
                                    }
                                    {
                                        pokeDetails.Altura ?
                                            <h3 className='stats'> Height: {pokeDetails.Altura}</h3> :
                                            <h3 className='stats'> Height: {pokeDetails[0].height}</h3>
                                    }
                                    {
                                        pokeDetails.Peso ?
                                            <h3 className='stats'> Weight: {pokeDetails.Peso}</h3> :
                                            <h3 className='stats'> Weight: {pokeDetails[0].weight}</h3>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {/* <h1>ESTOY CARGANDO</h1> */}
                    <img src="https://media3.giphy.com/media/IQebREsGFRXmo/200.gif" alt="" />
                </div>
            )}

        </div>
    )
};

