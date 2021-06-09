import { combineReducers } from 'redux';

import medicationReducer from './medicationReducer';

export default combineReducers({
    medications: medicationReducer
});