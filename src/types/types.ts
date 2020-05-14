export type action = {type?: string, [key: string]: any};
export type dispatch = (action: action, state?: Object) => void;
export type reducer = (state: Object, action: action) => Object;
export type middleware = (action: action, state: Object) => void;