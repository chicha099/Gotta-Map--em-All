import react from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes } from '../actions';
import { filterPokemonsByType } from '../actions';
import './Sidebar.css';

export default function Sidebar() {
    const dispatch = useDispatch();
    const allTypes = useSelector((state) => state.types);

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    function handleFilterTypes(e) {
        dispatch(filterPokemonsByType(e.target.value));
        e.value = ''
    }

    return (
        <div className='SidebarDiv'>
            <div>
                {
                    allTypes && allTypes.map(t => {
                        let typeF = t.name[0].toUpperCase() + t.name.slice(1);
                        return (
                            <div className='Filter'>
                                <div>
                                    <button id={typeF} name="filters" value={t.name} className='ButtonFilterTypes' onClick={e => handleFilterTypes(e)} />
                                </div>
                                <label for={typeF} className='Label'>{typeF}</label>
                            </div>
                        )
                    })
                }
                <div className='Filter2'>
                    <div className='OriginalsNCreated'>
                        <div >
                            <button id='all' name="filters" value='all' onClick={e => handleFilterTypes(e)} className='ButtonFilterOther' />
                        </div>
                        <label for='all' className='Label'>All</label>
                    </div>
                    <div className='OriginalsNCreated'>
                        <div >
                            <button id='originals' name="filters" value='originals' className='ButtonFilterOther' />
                        </div>
                        <label for='originals' className='Label'>Originals</label>
                    </div>
                    <div className='OriginalsNCreated' id='CreatedDiv'>
                        <div >
                            <button id='created' name="filters" value='created' className='ButtonFilterOther' />
                        </div>
                        <label for='created' className='Label' >Created</label>
                    </div>
                </div>
            </div>
        </div>
    )
};