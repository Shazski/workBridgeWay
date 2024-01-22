import { createSlice } from "@reduxjs/toolkit";
import { IUserLoginData } from "../../../interface/IuserLogin";
import { persistReducer } from "redux-persist";
import { persistConfig } from "../../../config/constants";
import { logoutUser, userSignUp } from "../../actions/user/userActions";
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null as IUserLoginData | null,
    error: null as string | null,
    loading: false as boolean,
  },
  reducers: {},

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
      });
  },
});

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

// export const { actions: userActions } = userSlice;
export default persistedUserReducer;
