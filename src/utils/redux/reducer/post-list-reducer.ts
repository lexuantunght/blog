import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserData from 'domain/model/user-data';

export type PostListState = {
    page: number;
    limit: number;
};

const defaultState: PostListState = {
    page: 0,
    limit: 12,
};

const postListSlice = createSlice({
    name: 'post-list',
    initialState: defaultState,
    reducers: {
        setPage: (state: PostListState, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
    },
});

const PostListReducer = postListSlice.reducer;

export const { setPage } = postListSlice.actions;

export default PostListReducer;
