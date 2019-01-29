
import { combineReducers } from 'redux';
import data         from './reducers/data';
import view         from './reducers/view';

export default combineReducers({
    data,
    view
})
