import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name:"profile",
    initialState:{
        profile:null as  null,
        error:null as string | null,
        loading: false as boolean,
    },
    reducers:{
    },

    extraReducers(builder) {
        builder
    },
})



export const { actions: userActions } = profileSlice;

export default profileSlice.reducer