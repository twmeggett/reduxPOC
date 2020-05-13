import axios from 'axios';

import { addReducer } from '../store';
import asyncReducerCreator from '../utils/asyncReducerCreator';
import combindReducers from '../utils/combindReducers';
import { dispatch } from '../types/types'

const RESET = 'RESET';
const UPDATE_SAVE_MSG = 'UPDATE_SAVE_MSG'

interface IPokemon {
    id: number | null,
    name: string,
    img: string,
}
interface IPokeReducerState {
    isFetchingPokemon: boolean,
    isSavingPokemon: boolean,
    saveMsg: string,
    pokemon: IPokemon
}
const initialState: IPokeReducerState = {
    isFetchingPokemon: false,
    isSavingPokemon: false,
    saveMsg: '',
    pokemon: {
        id: null,
        name: '',
        img: '',
    },
};

type ACTION_TYPES = typeof RESET | typeof UPDATE_SAVE_MSG;
const reducer = (state: IPokeReducerState = initialState, action: {type: ACTION_TYPES, msg?: string}) => {
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
    pokemon: payload
}));

export const fetchPokemon = async (dispatch: dispatch, id: number) => {
    if (id) {
        dispatch({type: FETCH_POKEMON_REQUEST});
        try {
            const payload: IPokemon = await new Promise (resolve => {
                setTimeout( function() {
                    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
                        .then((resp) => resolve({
                            id: resp.data.id,
                            name: resp.data.name,
                            img: resp.data.sprites.front_default,
                        }))
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

export const savePokemon = async (dispatch: dispatch, fail: boolean) => {
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

export const reset = (dispatch: dispatch) => {
    dispatch({type: RESET});
}

addReducer({name: 'pokeReducer', reducer: combindReducers([reducer, fetchPokemonReducer, savePokemonReducer])});
