import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    menuOpen: false,
  },
  reducers: {
    setMenuOpen(state, action) {
      state.menuOpen = action.payload;
    },
    toggleMenu(state) {
      state.menuOpen = !state.menuOpen;
    },
  },
});

export const { setMenuOpen, toggleMenu } = sidebarSlice.actions;
export default sidebarSlice.reducer;
