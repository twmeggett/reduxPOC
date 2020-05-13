import capitalize from './capitalize';

export default (initialState, method, name, mapPayload) => {
    const CONSTANT_BASE = `${method.toUpperCase()}_${name.toUpperCase()}`;
    const CONSTANT_REQUEST = CONSTANT_BASE + '_REQUEST';
    const CONSTANT_SUCCESS = CONSTANT_BASE + '_SUCCESS';
    const CONSTANT_FAILURE = CONSTANT_BASE + '_FAILURE';
    const methodCapitalized = capitalize(method);
    const nameCapitalized = capitalize(name);
    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case CONSTANT_REQUEST:
                return {
                    ...state, 
                    [`is${methodCapitalized}ing${nameCapitalized}`]: true  
                }
            case CONSTANT_SUCCESS:
                return {
                    ...state,
                    [`is${methodCapitalized}ing${nameCapitalized}`]: false,
                    ...(mapPayload ? mapPayload(action.payload) : {}),
                }
            case CONSTANT_FAILURE:
                return { ...state, [`is${methodCapitalized}ing${nameCapitalized}`]: false }
          default:
            return state
        }   
    }

    return [reducer, CONSTANT_REQUEST, CONSTANT_SUCCESS, CONSTANT_FAILURE]
}