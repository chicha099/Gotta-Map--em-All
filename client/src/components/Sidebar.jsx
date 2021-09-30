import react from 'react';
import './Sidebar.css';

export default function Sidebar() {
    return (
        <div className='SidebarDiv'>
            <select>
                <option value="alpha-Asc">A-Z</option>
                <option value="alpha-Desc">Z-A</option>
                <option value="fuerza-Asc">Fuerza Asc</option>
                <option value="fuerza-Desc">Fuerza Desc</option>
            </select>
            <select>
                <option value=""></option>
                <option value=""></option>
            </select>
        </div>
    )
};