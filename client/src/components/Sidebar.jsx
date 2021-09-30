import react from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes } from '../actions';
import './Sidebar.css';

export default function Sidebar() {
    const dispatch = useDispatch();
    const allTypes = useSelector((state) => state.types);

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    return (
        <div className='SidebarDiv'>
            <div>
                {
                    allTypes && allTypes.map(t => {
                        let typeF = t.name[0].toUpperCase() + t.name.slice(1);
                        return (
                            <div className='Filter'>
                                <div>
                                    <input type="checkbox" id={typeF} name="filters" value={typeF} className='Checkbox' />
                                </div>
                                <label for={typeF} className='Label'>{typeF}</label>
                            </div>
                        )
                    })
                }
                <div className='Filter2'>
                    <div className='OriginalsNCreated'>
                        <div className='Checkbox'>
                            <input type="checkbox" id='originals' name="filters" value='originals' />
                        </div>
                        <label for='originals' className='Label'>Originals</label>
                    </div>
                    <div className='OriginalsNCreated' id='CreatedDiv'>
                        <div className='Checkbox'>
                            <input type="checkbox" id='created' name="filters" value='created' />
                        </div>
                        <label for='created' className='Label' >Created</label>
                    </div>
                </div>
            </div>
        </div>
    )
};