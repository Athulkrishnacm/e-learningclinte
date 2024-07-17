import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authorized: false,
  },
  reducers: {
    userAuthorized: (state,action) => {
      state.authorized = true;
    },
    userUnauthorized: (state) => {
      state.authorized = false;
    },
  },
});

export const {userAuthorized,userUnauthorized} = userSlice.actions
export default userSlice.reducer