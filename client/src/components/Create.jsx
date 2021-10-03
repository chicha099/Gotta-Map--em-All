import React from "react";
import Nav from './Nav';
import './Create.css'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTypes, postPokemon } from "../actions";

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

    function handleOnChange(e) {
        e.preventDefault();
        const name = e.target.name;
        let value = e.target.value;
        let id = e.target.id;
        if (name === 'Tipos' && id === '0') {
            value = [...input.Tipos, value];
            console.log(value)
            value = [e.target.value, value[1]]
            setInput({
                ...input,
                [name]: value
            })
        }
        if (name === 'Tipos' && id === '1') {
            value = [...input.Tipos, value];
            console.log(value)
            value = [value[0], e.target.value]
            setInput({
                ...input,
                [name]: value
            })
        }
        setInput({
            ...input,
            [name]: value
        })
        console.log(input)
    };

    function handlePost(e){
        e.preventDefault();
        dispatch(postPokemon(input))
    }

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
                        <input type="text" name="Nombre" onChange={(e => handleOnChange(e))} value={input.Nombre} />
                    </div>
                    <div className='InputsCreate'>
                        <label>Types:</label>
                        <div className='typeInputs'>
                            <select id='0' name="Tipos" className='Options' onChange={(e => handleOnChange(e))}>
                                {
                                    allTypes && allTypes.map(t => {
                                        let typeF = t.name[0].toUpperCase() + t.name.slice(1);
                                        return (
                                            <option name="Tipos" value={t.id}>{typeF}</option>
                                        )
                                    })
                                }
                            </select>
                            <select id='1' name="Tipos" className='Options' onChange={(e => handleOnChange(e))}>
                                {
                                    allTypes && allTypes.map(t => {
                                        let typeF = t.name[0].toUpperCase() + t.name.slice(1);
                                        return (
                                            <option name="Tipos" value={t.id} >{typeF}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className='InputsCreate'>
                        <label>Image:</label>
                        <input type="url" name="Imagen" onChange={(e => handleOnChange(e))} value={input.Imagen} />

                    </div>
                    <div className='InputsCreate'>
                        <label>HP:</label>
                        <input type="number" name="Vida" onChange={(e => handleOnChange(e))} value={input.Vida} />
                    </div>
                    <div className='InputsCreate'>
                        <label>Force:</label>
                        <input type="number" name="Fuerza" onChange={(e => handleOnChange(e))} value={input.Fuerza} />
                    </div>
                    <div className='InputsCreate'>
                        <label>Defense:</label>
                        <input type="number" name="Defensa" onChange={(e => handleOnChange(e))} value={input.Defensa} />
                    </div>
                    <div className='InputsCreate'>
                        <label>Speed:</label>
                        <input type="number" name="Velocidad" onChange={(e => handleOnChange(e))} value={input.Velocidad} />
                    </div>
                    <div className='InputsCreate'>
                        <label>Weight:</label>
                        <input type="number" name="Peso" onChange={(e => handleOnChange(e))} value={input.Peso} />
                    </div>
                    <div className='InputsCreate'>
                        <label>Height:</label>
                        <input type="number" name="Altura" onChange={(e => handleOnChange(e))} value={input.Altura} />
                    </div>
                    <div >
                        <button type="submit" onClick={(e => handlePost(e))}>Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}