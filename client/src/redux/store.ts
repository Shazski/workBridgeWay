import { configureStore } from "@reduxjs/toolkit";
import persistedUserReducer from "./reducers/user/userSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

export const persistConfig = {
    key:"root",
    version:1,
    storage
}

const reducer = combineReducers({
    user: persistedUserReducer
})



 export const store = configureStore({
  reducer: reducer,
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
