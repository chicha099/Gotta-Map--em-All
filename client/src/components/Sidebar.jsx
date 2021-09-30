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
                        console.log(t.name);
                        return (
                            <div className='Filter'>
                                <div>
                                    <input type="checkbox" id={t.name} name="filters" value={t.name} className='Checkbox' />
                                </div>
                                <label for={t.name} >{t.name}</label>
                            </div>
                        )
                    })
                }
                <div className='Filter2'>
                    <div className='OriginalsNCreated'>
                        <input type="checkbox" id='originals' name="filters" value='originals' />
                        <label for='originals' >originals</label>
                    </div>
                    <div className='OriginalsNCreated'>
                        <input type="checkbox" id='created' name="filters" value='created' />
                        <label for='created' >created</label>
                    </div>
                </div>
            </div>
        </div>
    )
};