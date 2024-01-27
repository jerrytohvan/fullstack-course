
import { createSlice } from "@reduxjs/toolkit";

const initialState = { filter: null };

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterAnecdotes(state, action) {
      const filter = action.payload;
      state.filter = filter;
    }
  }
});

export const { filterAnecdotes } = filterSlice.actions;
export default filterSlice.reducer;
