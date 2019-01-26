import { applyMiddleware, createStore } from 'redux';
import {createLogger} from 'redux-logger';
import reducer from './reducers';

const middleware = applyMiddleware(createLogger()) // redux log

// you can import store from here in other files
export const store = (setting.log.react) ?          
                       createStore(reducer, middleware) : 
                       createStore(reducer);