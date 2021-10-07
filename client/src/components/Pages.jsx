import React from 'react';
import './Pages.css';

export default function Pagination({ pokemonsPerPage, allPokemons, pages }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <footer className='footer'>
            <div className='Pages'>
                {
                    pageNumbers && pageNumbers.map(p => {
                        return (
                            <div>
                                <button className='Page' onClick={() => pages(p)} >{p}</button>
                            </div>
                        )
                    })
                }
            </div>
        </footer>
    )
}