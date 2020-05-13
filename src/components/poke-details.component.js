import React, { useState, useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { StoreContext } from '../store';
import { fetchPokemon, savePokemon, reset } from '../reducers/poke.reducer';
import capitalize from '../utils/capitalize';

const PokeDetails = (props) => {
    const { state, dispatch } = useContext(StoreContext);
    const [ pokeId, setPokeId ] = useState();
    const { id } = useParams();
    const goBack = () => props.history.push("/");
    const goToNextPokemon = () => setPokeId(pokeId + 1);
    const goToPrevPokemon = () => (pokeId > 1) && setPokeId(pokeId - 1);
    const changePokemon = (dir) => () => {
        reset(dispatch);
        dir === 'next' ? goToNextPokemon() : goToPrevPokemon();
    }
    const save = () => savePokemon(dispatch) 
    
    useEffect(() => {
        setPokeId(parseInt(id));

        return function cleanup() {
            reset(dispatch);
        }
    }, []);

    useEffect(() => {
        fetchPokemon(dispatch, pokeId);
    }, [pokeId]);

    return (
        <div>
            <div>
                <button onClick={changePokemon()}>Previous</button>
                <button onClick={changePokemon('next')}>Next</button>
                {
                    state.pokeReducer.isFetchingPokemon ? (
                        <div>
                            <p>Loading...</p>
                        </div>
                    ) : (
                        <div>
                            <p>{capitalize(state.pokeReducer.pokemon.name)}</p>
                            <img src={state.pokeReducer.pokemon.img} alt={state.pokeReducer.pokemon.name} />
                        </div>
                    )
                }
            </div>
            
            <div>
                <button onClick={goBack}>Back Home</button>
                <button onClick={save}>Save</button>
            </div>

            <div>
                {
                    state.pokeReducer.saveSuccessful && <p>Save Success!</p>
                }
            </div>
        </div>
    )
};

export default PokeDetails;