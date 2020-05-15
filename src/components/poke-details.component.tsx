import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { History } from 'history';

import { StoreContext } from '../store';
import { fetchPokemon, savePokemon, reset } from '../reducers/poke.reducer';
import capitalize from '../utils/capitalize';

interface IProps {
    history: History,
    [key: string]: any,
}

const PokeDetails = (props: IProps) => {
    const { state, call } = useContext(StoreContext);
    const [ pokeId, setPokeId ] = useState(0);
    const { id } = useParams();
    const goBack = () => props.history.push("/");
    const goToNextPokemon = () => setPokeId(pokeId + 1);
    const goToPrevPokemon = () => (pokeId > 1) && setPokeId(pokeId - 1);
    const changePokemon = (dir?: 'next') => () => {
        call(reset());
        dir === 'next' ? goToNextPokemon() : goToPrevPokemon();
    }
    const save = (fail: boolean = false) => () => call(savePokemon(fail));
    
    useEffect(() => {
        return function cleanup() {
            call(reset());
        }
    }, []);

    useEffect(() => {
        setPokeId(parseInt(id));
    }, [id]);

    useEffect(() => {
        call(fetchPokemon(pokeId));
    }, [pokeId]);

    return (
        <>
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
                <button onClick={save()}>Save</button>
                <button onClick={save(true)}>Save Fail</button>
            </div>

            <div>
                {
                    state.pokeReducer.isSavingPokemon && <p>...Saving</p>
                }
                {
                    !state.pokeReducer.isSavingPokemon && <p>{state.pokeReducer.saveMsg}</p>
                }
            </div>
        </>
    )
};

export default PokeDetails;