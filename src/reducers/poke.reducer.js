import axios from 'axios';

import { getDispatch, addReducer } from '../store';
import asyncReducerCreator from '../utils/asyncReducerCreator';
import combindReducers from '../utils/combindReducers';

const RESET = 'RESET';

const initialState = {
    pokemon: {
        id: null,
        name: '',
        img: '',
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET:
            return initialState
      default:
        return state
    }
};

const [
    fetchPokemonReducer,
    FETCH_POKEMON_REQUEST,
    FETCH_POKEMON_SUCCESS,
    FETCH_POKEMON_FAILURE,
] = asyncReducerCreator(initialState, 'Fetch', 'pokemon', (payload) => ({
    pokemon: {
        id: payload.data.id,
        name: payload.data.name,
        img: payload.data.sprites.front_default,
    }
}));

export const fetchPokemon = async (id) => {
    if (id) {
        const dispatch = getDispatch();

        dispatch({type: FETCH_POKEMON_REQUEST});
        try {
            const payload = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
            
            dispatch({type: FETCH_POKEMON_SUCCESS, payload});
        } catch {
            dispatch({type: FETCH_POKEMON_FAILURE});
        }
    }
}

const [
    savePokemonReducer,
    SAVE_POKEMON_REQUEST,
    SAVE_POKEMON_SUCCESS,
    SAVE_POKEMON_FAILURE,
] = asyncReducerCreator(initialState, 'Save', 'pokemon');

export const savePokemon = async (id) => {
    if (id) {
        const dispatch = getDispatch();

        dispatch({type: SAVE_POKEMON_REQUEST});
        try {
            dispatch({type: SAVE_POKEMON_SUCCESS});
        } catch {
            dispatch({type: SAVE_POKEMON_FAILURE});
        }
    }
}

export const reset = () => {
    const dispatch = getDispatch();

    dispatch({type: RESET});
}

addReducer({name: 'pokeReducer', reducer: combindReducers([reducer, fetchPokemonReducer, savePokemonReducer])});
