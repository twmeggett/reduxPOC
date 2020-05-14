import { middleware } from '../types/types';

const logger: middleware = (action, state) => {
    console.log(action, state)
}

export default logger;