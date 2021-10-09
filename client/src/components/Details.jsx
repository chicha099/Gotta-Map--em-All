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
                                            <h3 className='stats' id='pokeTypeDet2'>{pokeDetails.tipos[0].name[0].toUpperCase() + pokeDetails.tipos[0].name.slice(1) + " " + pokeDetails.tipos[1].name[0].toUpperCase() + pokeDetails.tipos[1].name.slice(1)}</h3> :
                                            (pokeDetails[0].types.length === 2 ? <h3 className='stats' id='pokeTypeDet2'>{pokeDetails[0].types[0][0].toUpperCase() + pokeDetails[0].types[0].slice(1) + " " + pokeDetails[0].types[1][0].toUpperCase() + pokeDetails[0].types[1].slice(1)}</h3> :
                                                <h3 className='stats' id='pokeTypeDet1'>{pokeDetails[0].types[0][0].toUpperCase() + pokeDetails[0].types[0].slice(1)}</h3>)
                                    }
                                    {
                                        pokeDetails.Vida ?
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails.Vida }}>HP:</h3> <h3 className='statHP'>{pokeDetails.Vida}</h3></div>
                                            :
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails[0].hp }}>HP:</h3> <h3 className='statHP'>  {pokeDetails[0].hp}</h3></div>
                                    }
                                    {
                                        pokeDetails.Fuerza ?
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails.Fuerza }}>FORCE:</h3> <h3 className='statForce'> {pokeDetails.Fuerza}</h3></div>
                                            :
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails[0].force }}>FORCE:</h3> <h3 className='statForce'> {pokeDetails[0].force}</h3></div>
                                    }
                                    {
                                        pokeDetails.Defensa ?
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails.Defensa }}>DEFENSE:</h3> <h3 className='statDefense'>{pokeDetails.Defensa}</h3></div>
                                            :
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails[0].defense }}>DEFENSE:</h3> <h3 className='statDefense'> {pokeDetails[0].defense}</h3></div>
                                    }
                                    {
                                        pokeDetails.Velocidad ?
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails.Velocidad }}>SPEED: </h3> <h3 className='statSpeed'>{pokeDetails.Velocidad} </h3></div>
                                            :
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails[0].speed }}>SPEED: </h3> <h3 className='statSpeed'>{pokeDetails[0].speed} </h3></div>
                                    }
                                    {
                                        pokeDetails.Altura ?
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails.Altura }}>HEIGHT: </h3> <h3 className='statHeight'>{pokeDetails.Altura} </h3></div>
                                            :
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails[0].height }}>HEIGHT: </h3> <h3 className='statHeight'>{pokeDetails[0].height} </h3></div>
                                    }
                                    {
                                        pokeDetails.Peso ?
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails.Peso }}>WEIGHT: </h3> <h3 className='statWeight'>{pokeDetails.Peso} </h3></div>
                                            :
                                            <div className='contChart'> <h3 className='chart' style={{ width: pokeDetails[0].weight }}>WEIGHT: </h3> <h3 className='statWeight'>{pokeDetails[0].weight} </h3></div>
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

