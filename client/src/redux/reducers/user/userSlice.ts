import { createSlice } from "@reduxjs/toolkit";
import { IUserLoginData } from "../../../interface/IuserLogin";
import { persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
// import { persistConfig } from "../../store";
const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null as IUserLoginData | null,
        error:null as string | null,
        loading: false as boolean,
    },
    reducers:{
    },

    extraReducers(builder) {
        builder
    },
})
const persistConfig = {
    key:"root",
    storage
}

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

export const { actions: userActions } = userSlice;
export default persistedUserReducer;