import { createSlice } from "@reduxjs/toolkit";
import { IUserLoginData } from "../../../interface/IuserLogin";
import { getAllUsers } from "../../actions/admin/adminActions";

const adminSlice = createSlice({
 name: "admin",
 initialState: {
  loading: null as boolean | null,
  usersDetails: null as IUserLoginData[] | null,
  error: null as string | null,
  usersCount: null as number | null,
 },
 reducers: {},

 extraReducers: (builder) => {
  builder
   .addCase(getAllUsers.pending, (state) => {
    state.loading = true;
   })
   .addCase(getAllUsers.fulfilled, (state, action) => {
    state.loading = false;
    state.usersDetails = action.payload[0];
    state.usersCount = action.payload[1];
    state.error = null;
   })
   .addCase(getAllUsers.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
    state.usersDetails = null;
   });
 },
});

export default adminSlice.reducer;
