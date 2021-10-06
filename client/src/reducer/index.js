
const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    detail: [],
    popup: false,
    id: null
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
            const allOrderedByName = state.pokemons;
            const allOgByName = allOrderedByName.filter(p => p.types);
            const allCtByNameRaw = allOrderedByName.filter(p => p.tipos);
            const allCtByNameFixed = [];
            allCtByNameRaw.forEach(p => {
                allCtByNameFixed.push({
                    name: p.Nombre,
                    img: p.Imagen,
                    types: [p.tipos[0].name, p.tipos[1].name]
                })
            });
            let finalOrdered = allOgByName.concat(allCtByNameFixed);
            let orderedNames = action.payload === 'alpha-Asc' ?
                finalOrdered.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                finalOrdered.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                pokemons: orderedNames
            };
        //FUERZA
        case 'ORDER_BY_FORCE':
            const allOrderedByForce = state.pokemons;
            const allOgByForce = allOrderedByForce.filter(p => p.types);
            const allCtByForceRaw = allOrderedByForce.filter(p => p.tipos);
            const allCtByForceFixed = [];
            allCtByForceRaw.forEach(p => {
                allCtByForceFixed.push({
                    name: p.Nombre,
                    img: p.Imagen,
                    types: [p.tipos[0].name, p.tipos[1].name],
                    force: p.Fuerza
                })
            });
            let finalOrderedF = allOgByForce.concat(allCtByForceFixed);
            let orderedForces = action.payload === 'force-Asc' ?
                finalOrderedF.sort(function (a, b) {
                    if (a.force > b.force) {
                        return 1;
                    }
                    if (b.force > a.force) {
                        return -1;
                    }
                    return 0;
                }) :
                finalOrderedF.sort(function (a, b) {
                    if (a.force > b.force) {
                        return -1;
                    }
                    if (b.force > a.force) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                pokemons: orderedForces
            };
        case 'SEARCH_NAME':
            return {
                ...state,
                pokemons: action.payload
            };
        case 'POST_POKEMON':
            return {
                ...state
            };
        case 'SEARCH_ID':
            return {
                ...state,
                detail: action.payload
            };
        case 'CHANGE_POPUP':
            return {
                ...state,
                popup: action.payload[0],
                id: action.payload[1]
            };
        default:
            return state;
    }
}

export default rootReducer;