import capitalize from './capitalize';

const FETCH = 'fetch';
const SAVE = 'save';
const DELETE = 'delete';
type METHODS = typeof FETCH | typeof SAVE | typeof DELETE;
type mapPayload = (payload: {[key: string]: any}) => {};

const actionConstants: { [key: string]: string } = {
    [FETCH]: 'isFetching',
    [SAVE]: 'isSaving',
    [DELETE]: 'isDeleting',
};

interface IAsyncReducerCreator {
    (initialState: {}, method: METHODS, item: string, mapPayload: mapPayload): [any, string, string, string];
};

const asyncReducerCreator: IAsyncReducerCreator = (initialState, method, item, mapPayload) => {
    const CONSTANT_BASE = `${method.toUpperCase()}_${item.toUpperCase()}`;
    const CONSTANT_REQUEST = CONSTANT_BASE + '_REQUEST';
    const CONSTANT_SUCCESS = CONSTANT_BASE + '_SUCCESS';
    const CONSTANT_FAILURE = CONSTANT_BASE + '_FAILURE';
    const methodAction: string = actionConstants[method.toUpperCase()] + capitalize(item);
    const reducer = (state = initialState, action: {type: string, payload: {[key: string]: any}}) => {
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

export default asyncReducerCreator;