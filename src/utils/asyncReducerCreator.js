import capitalize from '../utils/capitalize';

const actionConstants = {
    'FETCH': 'isFetching',
    'SAVE': 'isSaving',
    'DELETE': 'isDeleting',
};

export default (initialState, method, item, mapPayload) => {
    const CONSTANT_BASE = `${method.toUpperCase()}_${item.toUpperCase()}`;
    const CONSTANT_REQUEST = CONSTANT_BASE + '_REQUEST';
    const CONSTANT_SUCCESS = CONSTANT_BASE + '_SUCCESS';
    const CONSTANT_FAILURE = CONSTANT_BASE + '_FAILURE';
    const methodAction = actionConstants[method.toUpperCase()] + capitalize(item);
    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case CONSTANT_REQUEST:
                return {
                    ...state, 
                    [methodAction]: true,
                }
            case CONSTANT_SUCCESS:
                return {
                    ...state,
                    [methodAction]: false,
                    ...(mapPayload ? mapPayload(action.payload) : {}),
                }
            case CONSTANT_FAILURE:
                return {
                    ...state,
                    [methodAction]: false,
                }
          default:
            return state
        }   
    }

    return [reducer, CONSTANT_REQUEST, CONSTANT_SUCCESS, CONSTANT_FAILURE]
}