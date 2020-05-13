import React, { useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { StoreContext } from '../store';
import { fetchPokemon, savePokemon, reset } from '../reducers/poke.reducer';

const PokeDetails = (props) => {
    const { pokeReducer } = useContext(StoreContext);
    const { id } = useParams();
    
    useEffect(() => {
        fetchPokemon(parseInt(id));

        return function cleanup() {
            reset();
        }
    }, [id]);

    const goBack = () => {
        props.history.push("/")
    }

    return (
        <div>
            <div>
                <p>{pokeReducer.pokemon.name}</p>
                <img src={pokeReducer.pokemon.img} alt={pokeReducer.pokemon.name} />
            </div>
            
            <div>
                <button onClick={goBack}>Back Home</button>
                <button onClick={savePokemon}>Save</button>
            </div>
        </div>
    )
};

export default PokeDetails;