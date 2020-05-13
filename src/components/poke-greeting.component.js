import React from 'react';

export default (props) => {
    const goToPokemon = () => {
        props.history.push("/details/9")
    }

    return (
        <div>
            <h1>Hello Poke Trainer!</h1>
            <button onClick={goToPokemon}>Go To My OG Pokemon</button>
        </div>
    )
}