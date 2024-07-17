import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    authorized: false,
  },
  reducers: {
    adminAuthorized: (state,action) => {
      state.authorized = true;
    },
    adminUnauthorized: (state) => {
      state.authorized = false;
    },
  },
});

export const {adminAuthorized,adminUnauthorized} = adminSlice.actions
export default adminSlice.reducer