import { createSlice } from "@reduxjs/toolkit";

const authModalSlice = createSlice({
  name: "auth-modal",
  initialState: { isOpen: false, view: "" },
  reducers: {
    openAuthModal(state, { payload }) {
      state.isOpen = true;
      state.view = payload;
    },
    closeAuthModal(state) {
      state.isOpen = false;
      state.view = "";
    },
  },
});

export const authModalAction = authModalSlice.actions;

export default authModalSlice;
