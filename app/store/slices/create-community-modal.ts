import { createSlice } from "@reduxjs/toolkit";

const createCommunitySlice = createSlice({
  name: "create-community-modal",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
  },
});

export default createCommunitySlice;

export const createCommunityModalAction = createCommunitySlice.actions;
