import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GetPokemonById, changePopup, resetDetail } from "../actions";
import { useEffect } from "react";
import './Details.css';

export default function Details() {
    const dispatch = useDispatch();
    const pokeDetails = useSelector((state) => state.detail);
    const idDetail = useSelector((state) => state.id);

    useEffect(() => {
        dispatch(resetDetail());
    }, [])

    useEffect(() => {
        dispatch(GetPokemonById(idDetail));
    }, [dispatch]);

    function handleClickPopup(bool) {
        dispatch(changePopup(bool))
    }


    console.log(pokeDetails)
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
                                    <h1 className='pokeNameDet'>{pokeDetails.Nombre[0].toUpperCase() + pokeDetails.Nombre.slice(1)}</h1> :
                                    <h1 className='pokeNameDet'>{pokeDetails[0].name[0].toUpperCase() + pokeDetails[0].name.slice(1)}</h1>
                            }
                            <div className='imgDetailDiv'>
                                <div className='specImg' id={pokeDetails.tipos ? pokeDetails.tipos[0].name : pokeDetails[0].types[0]}>
                                    {
                                        pokeDetails.Imagen ?
                                            <img className='imgDetail' src={pokeDetails.Imagen} alt="" height='263px' /> :
                                            <img className='imgDetail' src={pokeDetails[0].img} alt="" />
                                    }

                                </div>
                                <div className='detailedInfo'>
                                    {
                                        pokeDetails.tipos ?
                                            <h3 className='stats' id='pokeTypeDet'>{pokeDetails.tipos[0].name[0].toUpperCase() + pokeDetails.tipos[0].name.slice(1) + " " + pokeDetails.tipos[1].name[0].toUpperCase() + pokeDetails.tipos[1].name.slice(1)}</h3> :
                                            (pokeDetails[0].types.length === 2 ? <h3 className='stats' id='pokeTypeDet'>{pokeDetails[0].types[0][0].toUpperCase() + pokeDetails[0].types[0].slice(1) + " " + pokeDetails[0].types[1][0].toUpperCase() + pokeDetails[0].types[1].slice(1)}</h3> :
                                                <h3 className='stats' id='pokeTypeDet'>{pokeDetails[0].types[0][0].toUpperCase() + pokeDetails[0].types[0].slice(1)}</h3>)
                                    }
                                    {
                                        pokeDetails.Vida ?
                                            <div className='contChart'><h3 className='stats'> HP: {pokeDetails.Vida}</h3> <h3 className='chart' style={{ width: pokeDetails.Vida }}>{pokeDetails.Vida}</h3></div>
                                            :
                                            <div className='contChart'><h3 className='stats'> HP: </h3> <h3 className='chart' style={{ width: pokeDetails[0].hp }}>{pokeDetails[0].hp}</h3></div>
                                    }
                                    {
                                        pokeDetails.Fuerza ?
                                            <div className='contChart'><h3 className='stats'> Force: {pokeDetails.Fuerza}</h3> <h3 className='chart' style={{ width: pokeDetails.Fuerza }}>{pokeDetails.Fuerza}</h3></div>
                                            :
                                            <div className='contChart'><h3 className='stats'> Force: </h3> <h3 className='chart' style={{ width: pokeDetails[0].force }}>{pokeDetails[0].force}</h3></div>
                                    }
                                    {
                                        pokeDetails.Defensa ?
                                            <div className='contChart'><h3 className='stats'> Defense: {pokeDetails.Defensa}</h3> <h3 className='chart' style={{ width: pokeDetails.Defensa }}>{pokeDetails.Defensa}</h3></div>
                                            :
                                            <div className='contChart'><h3 className='stats'> Defense: </h3> <h3 className='chart' style={{ width: pokeDetails[0].defense }}>{pokeDetails[0].defense}</h3></div>
                                    }
                                    {
                                        pokeDetails.Velocidad ?
                                            <div className='contChart'><h3 className='stats'> Speed: {pokeDetails.Velocidad}</h3> <h3 className='chart' style={{ width: pokeDetails.Velocidad }}>{pokeDetails.Velocidad}</h3></div>
                                            :
                                            <div className='contChart'><h3 className='stats'> Speed: </h3> <h3 className='chart' style={{ width: pokeDetails[0].speed }}>{pokeDetails[0].speed}</h3></div>
                                    }
                                    {
                                        pokeDetails.Altura ?
                                            <div className='contChart'><h3 className='stats'> Height: {pokeDetails.Peso}</h3> <h3 className='chart' style={{ width: pokeDetails.Altura }}>{pokeDetails.Altura}</h3></div>
                                            :
                                            <div className='contChart'><h3 className='stats'> Height: </h3> <h3 className='chart' style={{ width: pokeDetails[0].height }}>{pokeDetails[0].height}</h3></div>
                                    }
                                    {
                                        pokeDetails.Peso ?
                                            <div className='contChart'><h3 className='stats'> Weight: {pokeDetails.Peso}</h3> <h3 className='chart' style={{ width: pokeDetails.Peso }}>{pokeDetails.Peso}</h3></div>
                                            :
                                            <div className='contChart'><h3 className='stats'> Weight: </h3> <h3 className='chart' style={{ width: 255 }}>{pokeDetails[0].weight}</h3></div>
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

