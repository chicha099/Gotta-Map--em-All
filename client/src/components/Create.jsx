import React from "react";
import Nav from './Nav';
import './Create.css'
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getTypes, postPokemon } from "../actions";
import { useHistory } from "react-router";

export default function Detail() {

    const history = useHistory();
    const dispatch = useDispatch();
    const allTypes = useSelector((state) => state.types);
    const [errors, setErrors] = useState({
        Nombre: '',
        Tipos: '',
        Imagen: '',
        Vida: '',
        Fuerza: '',
        Defensa: '',
        Velocidad: '',
        Peso: '',
        Altura: ''
    });

    console.log(allTypes)
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

        switch (name) {
            case 'Nombre':
                value.length < 1 ? setErrors({ ...errors, [name]: 'A name is required!' }) : setErrors({ ...errors, [name]: '' });
                break;
            case 'Imagen':
                value.slice(0, 4) !== 'http' ? setErrors({ ...errors, [name]: 'A valid url is required!' }) : setErrors({ ...errors, [name]: '' });
                break;
            case 'Tipos':
                input.Tipos.length !== 2 ? setErrors({ ...errors, [name]: 'Both types are required!' }) : setErrors({ ...errors, [name]: '' });
                break;
            case 'Vida':
                value < 1 ? setErrors({ ...errors, [name]: 'HP must be higher than 0!' }) : setErrors({ ...errors, [name]: '' });
                break;
            case 'Fuerza':
                value < 1 ? setErrors({ ...errors, [name]: 'Force must be higher than 0!' }) : setErrors({ ...errors, [name]: '' });
                break;
            case 'Defensa':
                value < 1 ? setErrors({ ...errors, [name]: 'Defense must be higher than 0!' }) : setErrors({ ...errors, [name]: '' });
                break;
            case 'Velocidad':
                value < 1 ? setErrors({ ...errors, [name]: 'Speed must be higher than 0!' }) : setErrors({ ...errors, [name]: '' });
                break;
            case 'Altura':
                value < 1 ? setErrors({ ...errors, [name]: 'Height must be higher than 0!' }) : setErrors({ ...errors, [name]: '' });
                break;
            case 'Peso':
                value < 1 ? setErrors({ ...errors, [name]: 'Weight must be higher than 0!' }) : setErrors({ ...errors, [name]: '' });
                break;
            default:
                break;
        }
    };


    function handlePost(e) {
        e.preventDefault();
        dispatch(postPokemon(input))
        alert("Pokemon succesfully created")
        history.push('/home')
    }

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    let type1;
    if (input.Tipos[0]) {
        type1 = allTypes.find(t => t.id == input.Tipos[0]).name
    }
    let type2;
    if (input.Tipos[1]) {
        type2 = allTypes.find(t => t.id == input.Tipos[1]).name
    }
    let bothTypes;
    if (type1 && type2) {
        bothTypes = type1[0].toUpperCase() + type1.slice(1) + " " + type2[0].toUpperCase() + type2.slice(1);
    }
    console.log(type1, type2)
    return (
        <div id='mainCreate' className='mainCreate'>
            <Nav />
            <div className='FormDiv'>
                <h1>Create your own Pokemon!</h1>
                <div className='formPrincipal'>
                    <form className='Form'>
                        <div className='InputsCreate'>
                            {!errors.Nombre ? null : <div className='ErrorCreate'>{errors.Nombre}</div>}
                            <label className=''>Name:</label>
                            <input type="text" name="Nombre" onChange={(e => handleOnChange(e))} value={input.Nombre} />
                        </div>
                        <div className='InputsCreate'>
                            {!errors.Tipos ? null : <div className='ErrorCreate'>{errors.Tipos}</div>}
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
                            {!errors.Imagen ? null : <div className='ErrorCreate'>{errors.Imagen}</div>}
                            <label>Image:</label>
                            <input type="url" name="Imagen" onChange={(e => handleOnChange(e))} value={input.Imagen} />
                        </div>
                        <div className='InputsCreate'>
                            {!errors.Vida ? null : <div className='ErrorCreate'>{errors.Vida}</div>}
                            <label>HP:</label>
                            <input type="number" name="Vida" onChange={(e => handleOnChange(e))} value={input.Vida} />
                        </div>
                        <div className='InputsCreate'>
                            {!errors.Fuerza ? null : <div className='ErrorCreate'>{errors.Fuerza}</div>}
                            <label>Force:</label>
                            <input type="number" name="Fuerza" onChange={(e => handleOnChange(e))} value={input.Fuerza} />
                        </div>
                        <div className='InputsCreate'>
                            {!errors.Defensa ? null : <div className='ErrorCreate'>{errors.Defensa}</div>}
                            <label>Defense:</label>
                            <input type="number" name="Defensa" onChange={(e => handleOnChange(e))} value={input.Defensa} />
                        </div>
                        <div className='InputsCreate'>
                            {!errors.Velocidad ? null : <div className='ErrorCreate'>{errors.Velocidad}</div>}
                            <label>Speed:</label>
                            <input type="number" name="Velocidad" onChange={(e => handleOnChange(e))} value={input.Velocidad} />
                        </div>
                        <div className='InputsCreate'>
                            {!errors.Peso ? null : <div className='ErrorCreate'>{errors.Peso}</div>}
                            <label>Weight:</label>
                            <input type="number" name="Peso" onChange={(e => handleOnChange(e))} value={input.Peso} />
                        </div>
                        <div className='InputsCreate'>
                            {!errors.Altura ? null : <div className='ErrorCreate'>{errors.Altura}</div>}
                            <label>Height:</label>
                            <input type="number" name="Altura" onChange={(e => handleOnChange(e))} value={input.Altura} />
                        </div>
                        <div >
                            <button className='buttonCreate' disabled={errors.Nombre || errors.Imagen || errors.Tipos || errors.Vida || errors.Fuerza || errors.Defensa || errors.Velocidad || errors.Altura || errors.Peso} type="submit" onClick={(e => handlePost(e))}>Create</button>
                        </div>
                    </form>
                    <div className='statsForm'>
                        {!input.Nombre ?
                            <h1 className='noName'>-</h1> :
                            <h1>{input.Nombre && input.Nombre[0].toUpperCase() + input.Nombre.slice(1)}</h1>
                        }
                        {!input.Imagen ?
                            <img src="https://loadslammer.com/wp-content/uploads/2021/01/photo-placeholder-icon-17.jpg" alt="" width='300px' /> :
                            <div className='formStatsImg'>
                                <img src={input.Imagen} alt="" width='300px' />
                            </div>
                        }
                        {!input.Tipos[0] || !input.Tipos[1] ?
                            <h1 className='noName'>notypes</h1> :
                            <h1>{bothTypes}</h1>
                        }

                        <h1>HP: {input.Vida}</h1>
                        <h1>Force: {input.Fuerza}</h1>
                        <h1>Defense: {input.Defensa}</h1>
                        <h1>Speed: {input.Velocidad}</h1>
                        <h1>Weight: {input.Peso}</h1>
                        <h1>Height: {input.Altura}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}