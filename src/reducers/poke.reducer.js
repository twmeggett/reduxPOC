import axios from 'axios';

import { addReducer } from '../store';
import asyncReducerCreator from '../utils/asyncReducerCreator';
import combindReducers from '../utils/combindReducers';

const RESET = 'RESET';
const UPDATE_SAVE_MSG = 'UPDATE_SAVE_MSG'

const initialState = {
    isFetchingPokemon: false,
    isSavingPokemon: false,
    saveMsg: '',
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
        case UPDATE_SAVE_MSG:
            return {
                ...state,
                saveSuccessful: false,
                saveMsg: action.msg,
            }
      default:
        return state
    }
};

const [
    fetchPokemonReducer,
    FETCH_POKEMON_REQUEST,
    FETCH_POKEMON_SUCCESS,
    FETCH_POKEMON_FAILURE,
] = asyncReducerCreator(initialState, 'fetch', 'pokemon', (payload) => ({
    pokemon: {
        id: payload.data.id,
        name: payload.data.name,
        img: payload.data.sprites.front_default,
    }
}));

export const fetchPokemon = async (dispatch, id) => {
    if (id) {
        dispatch({type: FETCH_POKEMON_REQUEST});
        try {
            const payload = await new Promise (resolve => {
                setTimeout( function() {
                    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
                        .then((resp) => resolve(resp))
                }, 1000) 
            });
            
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
] = asyncReducerCreator(initialState, 'save', 'pokemon', () => ({saveSuccessful: true}));

export const savePokemon = async (dispatch, fail) => {
    dispatch({type: UPDATE_SAVE_MSG, msg: ''});
    dispatch({type: SAVE_POKEMON_REQUEST});
    setTimeout(function() {
        if (!fail) {
            dispatch({type: SAVE_POKEMON_SUCCESS});
            dispatch({type: UPDATE_SAVE_MSG, msg: 'Save Success!'});
        } else {
            dispatch({type: SAVE_POKEMON_FAILURE});
            dispatch({type: UPDATE_SAVE_MSG, msg: 'Save Failed :('});
        }
    }, 1000) 
}

export const reset = (dispatch) => {
    dispatch({type: RESET});
}

addReducer({name: 'pokeReducer', reducer: combindReducers([reducer, fetchPokemonReducer, savePokemonReducer])});
