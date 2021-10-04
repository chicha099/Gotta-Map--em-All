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

export function filterPokemonsByType(payload) {
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
}

export function filterPokemonsByOrigin(payload) {
    return {
        type: 'FILTER_BY_ORIGIN',
        payload
    }
}

export function orderPokemonsByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderPokemonsByForce(payload) {
    return {
        type: 'ORDER_BY_FORCE',
        payload
    }
}

export function searchName(name) {
    return function (dispatch) {
        axios.get(`http://localhost:3001/pokemons?name=${name}`)
            .then(resp => {
                return dispatch({
                    type: 'SEARCH_NAME',
                    payload: resp.data
                })
            })
    }
}

export function postPokemon(payload){
    return function(dispatch){
        axios.post('http://localhost:3001/pokemons', payload)
        .then(resp => {
            return resp;
        })
    }
}

export function GetPokemonById(id){
    return function (dispatch) {
        axios.get(`http://localhost:3001/pokemons/${id}`)
            .then(resp => {
                return dispatch({
                    type: 'SEARCH_ID',
                    payload: resp.data
                })
            })
    }
}