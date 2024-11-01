import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isOpen: false,
};
const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openPopup(state) {
      state.isOpen = true;
    },
    closePopup(state) {
      state.isOpen = false;
    },
  },
});
export default popupSlice.reducer;

export const { openPopup, closePopup } = popupSlice.actions;

export const getOpen = (state) => state.ui.isOpen;
