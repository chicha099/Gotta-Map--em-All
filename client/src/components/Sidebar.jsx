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
                            <div>
                                <button value={t.name}>{t.name}</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};