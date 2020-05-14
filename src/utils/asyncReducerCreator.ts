import capitalize from './capitalize';
import { reducer } from '../types/types';

const FETCH = 'fetch';
const SAVE = 'save';
const DELETE = 'delete';
type METHODS = typeof FETCH | typeof SAVE | typeof DELETE;
type mapPayload = (payload: {[key: string]: any}) => Object;

const actionConstants: { [key: string]: string } = {
    [FETCH]: 'isFetching',
    [SAVE]: 'isSaving',
    [DELETE]: 'isDeleting',
};

interface IAsyncReducerCreator {
    (initialState: Object, method: METHODS, entity: string, mapPayload: mapPayload): [reducer, string, string, string];
};
const asyncReducerCreator: IAsyncReducerCreator = (initialState, method, entity, mapPayload) => {
    const CONSTANT_BASE = `${method.toUpperCase()}_${entity.toUpperCase()}`;
    const CONSTANT_REQUEST = CONSTANT_BASE + '_REQUEST';
    const CONSTANT_SUCCESS = CONSTANT_BASE + '_SUCCESS';
    const CONSTANT_FAILURE = CONSTANT_BASE + '_FAILURE';
    const methodAction: string = actionConstants[method.toLowerCase()] + capitalize(entity);
    const reducer: reducer = (state = initialState, action) => {
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