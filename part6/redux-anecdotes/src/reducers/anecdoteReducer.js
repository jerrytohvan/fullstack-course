import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action){
      const objectId = action.payload;
      const objectToChange = state.find((anecdote) => anecdote.id === objectId);
      const updatedObject = {
        ...objectToChange,
        votes: objectToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== objectId ? anecdote : updatedObject
      );
    },
    createAnecdote(state, action){
      const newAnecdote = action.payload;
      return [...state, newAnecdote];
    },
    setAnecdotes(state, action){
      return action.payload;
    }
  }
})

export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
