
const initialState = {
    pokemons: [],
    allPokemons: [],
    types: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
            };
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            };
            case 'FILTER_BY_TYPE':
                const allPokemons = state.allPokemons;
                const allOriginals = allPokemons.filter(p => p.types);
                const allCreateds = allPokemons.filter(p => p.tipos);   
                const typeFiltered = action.payload === 'all' ? allOriginals : allOriginals.filter(p => p.types[0] === action.payload || p.types[1] === action.payload);
                return {
                    ...state,
                    pokemons: typeFiltered
                };
        default:
            return state;
    }
}

export default rootReducer;