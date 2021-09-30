import axios from 'axios';

export function getPokemons() {
    return function (dispatch) {
        axios.get('http://localhost:3001/pokemons')
            .then(resp => {
                return dispatch({
                    type: 'GET_POKEMONS',
                    payload: resp.data
                })
            })
    }
}

export function getTypes() {
    return function (dispatch) {
        axios.get('http://localhost:3001/types')
            .then(resp => {
                return dispatch({
                    type: 'GET_TYPES',
                    payload: resp.data
                })
            })
    }
}