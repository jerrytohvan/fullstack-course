import { AnecdoteFilter } from "./components/AnecdoteFilter";
import { AnecdoteForm } from "./components/AnecdoteForm";
import { AnecdoteList } from "./components/AnecdoteList";

import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { useEffect } from "react";
import { setAnecdotes } from "./reducers/anecdoteReducer";

import { getAllAnecdotes } from "./services/anecdotes";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //Init Notification
    dispatch(setNotification("Hello World"));
    setTimeout(() => {
      dispatch(setNotification(""));
    }, 1000);

    getAllAnecdotes().then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, []);

  return (
    <div>
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
