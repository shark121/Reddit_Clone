import { configureStore } from "@reduxjs/toolkit";
import authModalSlice from "./slices/auth-modal-slice";
import createCommunitySlice from "./slices/create-community-modal";
import authProviderErrorSlice from "./slices/auth-provider-error";

const store = configureStore({
  reducer: {
    authModal: authModalSlice.reducer,
    createCommunityModal: createCommunitySlice.reducer,
    providerError: authProviderErrorSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
