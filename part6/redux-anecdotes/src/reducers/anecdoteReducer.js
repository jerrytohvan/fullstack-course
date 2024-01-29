import { createSlice } from "@reduxjs/toolkit";
import { getAllAnecdotes, createNewAnecdote } from "../services/anecdotes";
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
    setAnecdotes(state, action){
      return action.payload;
    },
    appendAnecdote(state, action){
      const newAnecdote = action.payload;
      state.push(newAnecdote)
    }
  }
})

export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

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

export default anecdoteSlice.reducer;
