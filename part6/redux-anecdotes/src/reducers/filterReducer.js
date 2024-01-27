

export const filterAnecdotes = (filter) => {
  return {
    type: "FILTER_ANECDOTE",
    payload: {
      filter
    }
  }
}

export const filterReducer = (state = { filter: null }, action) => {
  console.log("state now: ", state);
  if (action.type === "FILTER_ANECDOTE") {
    return {
      filter: action.payload.filter,
    }
  }
  return state;
};
