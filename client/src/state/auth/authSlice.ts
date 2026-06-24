import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";

export interface AuthState {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
}

const initialState: AuthState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  role: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.phone = "";
      state.address = "";
      state.role = "";
    },

    addUser: (state, action: PayloadAction<AuthState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
      state.role = action.payload.role;
    },
  },
});

export const { addUser, logout } = authSlice.actions;
export default authSlice.reducer;
