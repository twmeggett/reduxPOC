import React from 'react';
import { History } from 'history';

interface IProps {
    history: History,
    [key: string]: any,
}

export default (props: IProps) => {
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