import { combineReducers } from '@reduxjs/toolkit';
import AppReducer from 'utils/redux/reducer/app-reducer';
import PostListReducer from 'utils/redux/reducer/post-list-reducer';

const reducer = combineReducers({
    app: AppReducer,
    postList: PostListReducer,
});

export default reducer;
