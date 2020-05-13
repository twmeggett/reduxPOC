import React, { useReducer, useEffect } from 'react';

const [addReducer, addMiddleware, combinedReducer] = (() => {
    let reducers = [];
    let middlewares = [];
    const addReducer = (reducer) => reducers.push(reducer);
    const addMiddleware = (middleware) => middlewares.push(middleware);
    const combinedReducer = (initialState = {}, action = {}) => {
        return reducers.reduce((state, {name, reducer}) => {
            const resultingState = { ...state, [name]: reducer(state[name], action) };
            middlewares.forEach(middleware => middleware(action, resultingState));
            return resultingState;
        }, initialState)
    };
    return [addReducer, addMiddleware, combinedReducer]
})();

export {
    addReducer,
    addMiddleware,
};
export const StoreContext = React.createContext();
export const withStoreContext = (Component, middlewares) => (props) => {
    const [state, dispatch] = useReducer(combinedReducer, combinedReducer());
    
    useEffect(() => {
        middlewares.forEach(middlewares => addMiddleware(middlewares));
    }, [])

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            <Component {...props} />
        </StoreContext.Provider>
    );
};