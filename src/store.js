import React, { useReducer } from 'react';

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
const [getDispatch, setDispatch] = (() => {
    let dispatch = () => {};
    return [() => dispatch, (dispatcher) => dispatch = dispatcher]
})();

export {
    addReducer,
    addMiddleware,
    getDispatch,
};
export const StoreContext = React.createContext();
export const withStoreContext = (Component, middlewares) => (props) => {
    const [state, dispatch] = useReducer(combinedReducer, combinedReducer());
    setDispatch(dispatch);
    middlewares.forEach(middlewares => addMiddleware(middlewares));

    return (
        <StoreContext.Provider value={state}>
            <Component {...props} />
        </StoreContext.Provider>
    );
};