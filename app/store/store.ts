import { configureStore } from "@reduxjs/toolkit";
import authModalSlice from "./slices/auth-modal-slice";

const store = configureStore({
  reducer: {
    authModal: authModalSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
