
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
            const allCreated = allPokemons.filter(p => p.tipos);
            const typeFilteredOG = action.payload === 'all' ? allOriginals : allOriginals.filter(p => p.types[0] === action.payload || p.types[1] === action.payload);
            const typeFilteredCT = action.payload === 'all' ? allCreated : allCreated.filter(p => p.tipos[0].name === action.payload || p.tipos[1].name === action.payload);
            const typeFiltered = typeFilteredOG.concat(typeFilteredCT);
            return {
                ...state,
                pokemons: typeFiltered
            };
        case 'FILTER_BY_ORIGIN':
            const allPokemonsOrigin = state.allPokemons;
            const prop = action.payload;
            const originFiltered = allPokemonsOrigin.filter(p => p[prop])
            return {
                ...state,
                pokemons: originFiltered
            };
        case 'ORDER_BY_NAME':
            const allPokemonsOrderName = state.allPokemons;
            const allOriginalsOrderedByName = allPokemonsOrderName.filter(p => p.types);
            const allOriginalNamesOrderedByName = allOriginalsOrderedByName.map(p => p.name);
            const pokemonsOrderedByName = allOriginalNamesOrderedByName.sort();
            return {
                ...state,
                pokemons: pokemonsOrderedByName
            };
        default:
            return state;
    }
}

export default rootReducer;