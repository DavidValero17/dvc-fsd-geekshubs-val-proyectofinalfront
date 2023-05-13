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
        credentials: action.payload.credentials,
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

export const userData = (state) => state.user.credentials;

export default userSlice.reducer;