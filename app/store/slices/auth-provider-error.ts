import { createSlice } from "@reduxjs/toolkit";

const authProviderErrorSlice = createSlice({
  name: "provider-error",
  initialState: "",
  reducers: {
    setOAuthError(state, { payload }) {
      state = payload;
    },
  },
});

export default authProviderErrorSlice;

export const authProviderErrorAction = authProviderErrorSlice.actions;
