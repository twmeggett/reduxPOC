import React from 'react';

export default (props) => {
    const goToPokemon = () => {
        props.history.push("/details/93")
    }

    return (
        <div>
            <h1>Hello Poke Trainer!</h1>
            <button onClick={goToPokemon}>Go To Pokemon</button>
        </div>
    )
}