import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { Notification } from "./Notification";
import { addNewNotification } from "../reducers/notificationReducer";

export const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector(({ anecdotes, filters }) => {
    const filterQuery = filters.filter;

    if (filterQuery !== null) {
      return anecdotes.filter((anecdote) => anecdote.content.includes(filters.filter));
    } else {
      return anecdotes;
    }
  });

  const sortedAncedotes = anecdotes.slice().sort((a, b) => b.votes - a.votes);

  const voteAndNotifyAnectode = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(addNewNotification(`You voted '${anecdote.content}'`, 5));
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />

      {sortedAncedotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAndNotifyAnectode(anecdote)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
