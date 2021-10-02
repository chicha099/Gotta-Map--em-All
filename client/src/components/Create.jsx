import React from "react";
import Nav from './Nav';
import './Create.css'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTypes } from "../actions";

export default function Detail() {

    const dispatch = useDispatch();
    const allTypes = useSelector((state) => state.types);

    const [input, setInput] = React.useState({
        Nombre: '',
        Tipos: [],
        Imagen: '',
        Vida: 0,
        Fuerza: 0,
        Defensa: 0,
        Velocidad: 0,
        Peso: 0,
        Altura: 0
    });

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    return (
        <div id='mainCreate' className='mainCreate'>
            <Nav />
            <div className='FormDiv'>
                <h1>Create your own Pokemon!</h1>
                <form className='Form'>
                    <div className='InputsCreate'>
                        <label className=''>Name:</label>
                        <input type="text" />
                    </div>
                    <div className='InputsCreate'>
                        <label>Types:</label>
                        <div className='typeInputs'>
                            <select className='Options'>
                                {
                                    allTypes && allTypes.map(t => {
                                        let typeF = t.name[0].toUpperCase() + t.name.slice(1);
                                        return (
                                            <option value={t.name}>{typeF}</option>
                                        )
                                    })
                                }
                            </select>
                            <select className='Options'>
                                {
                                    allTypes && allTypes.map(t => {
                                        let typeF = t.name[0].toUpperCase() + t.name.slice(1);
                                        return (
                                            <option value={t.name}>{typeF}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className='InputsCreate'>
                        <label>Image:</label>
                        <input type="url" />

                    </div>
                    <div className='InputsCreate'>
                        <label>HP:</label>
                        <input type="number" />
                    </div>
                    <div className='InputsCreate'>
                        <label>Force:</label>
                        <input type="number" />
                    </div>
                    <div className='InputsCreate'>
                        <label>Defense:</label>
                        <input type="number" />
                    </div>
                    <div className='InputsCreate'>
                        <label>Speed:</label>
                        <input type="number" />
                    </div>
                    <div className='InputsCreate'>
                        <label>Weight:</label>
                        <input type="number" />
                    </div>
                    <div className='InputsCreate'>
                        <label>Height:</label>
                        <input type="number" />
                    </div>
                </form>
            </div>
        </div>
    )
}