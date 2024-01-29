import { createSlice } from "@reduxjs/toolkit";
import { getAllAnecdotes, createNewAnecdote, updateAnecdote } from "../services/anecdotes";
const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action){
      return action.payload;
    },
    appendAnecdote(state, action){
      const newAnecdote = action.payload;
      state.push(newAnecdote)
    },
    updateAnecdoteState(state, action){
      const updatedAnecdote = action.payload;
      const id = updatedAnecdote.id;
      return state.map((anecdote) => anecdote.id !== id ? anecdote : updatedAnecdote);
    }
  }
})

export const { appendAnecdote, setAnecdotes, updateAnecdoteState } = anecdoteSlice.actions;

export const initializeAnectotes = () => {
  return async dispatch => {
    const anecdotes = await getAllAnecdotes();
    dispatch(setAnecdotes(anecdotes));
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await createNewAnecdote(content);
    dispatch(appendAnecdote(newAnecdote));
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await updateAnecdote({ ...anecdote, votes: anecdote.votes + 1 });
      dispatch(updateAnecdoteState(updatedAnecdote));
  }
}

export default anecdoteSlice.reducer;
