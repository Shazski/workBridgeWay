import { configureStore } from "@reduxjs/toolkit";
import persistedUserReducer from "./reducers/user/userSlice";
import { combineReducers } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore"; 
import jobSlice from "./reducers/user/JobSlice";
import adminSlice from "./reducers/admin/adminSlice";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import companySlice from "./reducers/company/companySlice";
const reducer = combineReducers({
    user: persistedUserReducer,
    job:jobSlice,
    company:companySlice,
    admin:adminSlice
})

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});
export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
