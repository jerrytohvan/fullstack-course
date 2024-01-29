import { createSlice } from "@reduxjs/toolkit";
import { getAllAnecdotes } from "../services/anecdotes";
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

export const initializeAnectotes = () => {
  return async dispatch => {
    const anecdotes = await getAllAnecdotes();
    dispatch(setAnecdotes(anecdotes));
  }
}
export default anecdoteSlice.reducer;
