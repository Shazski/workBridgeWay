import { createSlice } from "@reduxjs/toolkit";
import { IUserLoginData } from "../../../interface/IuserLogin";
import { persistReducer } from "redux-persist";
import { persistConfig } from "../../../config/constants";
import {
  changeUserEmail,
  changeUserPassowrd,
  editUser,
  googleAuth,
  logoutUser,
  userSignUp,
} from "../../actions/user/userActions";
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null as any | null,
    error: null as string | null,
    loading: false as boolean,
  },
  reducers: {
    makeErrorDisable: (state) => {
      state.error = "";
    },
  },

  extraReducers(builder) {
    builder
      .addCase(userSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as IUserLoginData;
        state.error = null;
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as IUserLoginData;
        state.error = null;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        localStorage.removeItem("persist:root");
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as IUserLoginData;
        state.error = null;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(changeUserPassowrd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeUserPassowrd.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as IUserLoginData;
        state.error = null;
      })
      .addCase(changeUserPassowrd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(changeUserEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeUserEmail.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.message) {
          state.user.newEmail = action.payload.message as IUserLoginData;
        } else {
          state.user = action.payload as IUserLoginData
        }
        state.error = null;
      })
      .addCase(changeUserEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { makeErrorDisable  } =  userSlice.actions
const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

export default persistedUserReducer;
