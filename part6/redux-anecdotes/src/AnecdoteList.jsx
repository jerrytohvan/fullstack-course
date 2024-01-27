import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "./reducers/anecdoteReducer";

export const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filters }) => {
    const filterQuery = filters.filter;
    console.log(filterQuery)

    if (filterQuery !== null) {
      return anecdotes.filter((anecdote) => anecdote.content.includes(filters.filter));
    } else {
      return anecdotes;
    }
  });
  console.log(anecdotes)
  console.log(anecdotes.slice())
  const sortedAncedotes = anecdotes.slice().sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAncedotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
