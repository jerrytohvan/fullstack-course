import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { addNewNotification } from "../reducers/notificationReducer";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNewAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    dispatch(createAnecdote(content));
    dispatch(addNewNotification(`You created '${content}'`, 5));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div>
          <input name="note" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};
