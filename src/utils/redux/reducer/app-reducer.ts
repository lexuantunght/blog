import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserData from 'domain/model/user-data';

export type AppState = {
    userData?: UserData;
};

const defaultAppState: AppState = {
    userData: undefined,
};

const appSlice = createSlice({
    name: 'app',
    initialState: defaultAppState,
    reducers: {
        setUserData: (state: AppState, action: PayloadAction<UserData | undefined>) => {
            state.userData = action.payload;
        },
    },
});

const AppReducer = appSlice.reducer;

export const { setUserData } = appSlice.actions;

export default AppReducer;
