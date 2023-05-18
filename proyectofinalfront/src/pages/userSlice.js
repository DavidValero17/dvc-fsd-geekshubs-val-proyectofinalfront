import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    credentials: {},
  },
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    userout: (state) => {
      return {
        ...state,
        credentials: {},
      };
    },
  },
});

export const { login, userout } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;
