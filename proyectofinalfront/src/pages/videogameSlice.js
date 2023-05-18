import { createSlice } from "@reduxjs/toolkit";

export const videogameSlice = createSlice({
  name: "videogame",
  initialState: {
    videogames: [],
  },
  reducers: {
    setVideogames: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setVideogames } = videogameSlice.actions;

export const videogameData = (state) => state.videogame;

export default videogameSlice.reducer;
