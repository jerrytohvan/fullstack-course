import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
// import { createNewAnecdote } from "../services/anecdotes";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNewAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    // const addNewAnecdote = await createNewAnecdote(content);
    dispatch(createAnecdote(content));
    dispatch(setNotification(`You created '${content}'`));
    setTimeout(() => {
      dispatch(setNotification(""));
    }, 5000);
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
