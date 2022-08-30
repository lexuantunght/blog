import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './app-reducer';

const reducer = combineReducers({
    app: appReducer,
});

export default reducer;
