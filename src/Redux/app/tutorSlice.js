import { createSlice } from "@reduxjs/toolkit";

export const tutorSlice = createSlice({
  name: "tutor",
  initialState: {
    authorized: false,
    tutorName: null
  },
  reducers: {
    tutorAuthorized: (state, action) => {
      state.authorized = true;
      state.tutorName = action.payload.name
    },
    tutorUnauthorized: (state) => {
      state.authorized = false;
    },
  },
});

export const { tutorAuthorized, tutorUnauthorized } = tutorSlice.actions
export default tutorSlice.reducer