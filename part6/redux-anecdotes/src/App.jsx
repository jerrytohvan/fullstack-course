import { AnecdoteFilter } from "./components/AnecdoteFilter";
import { AnecdoteForm } from "./components/AnecdoteForm";
import { AnecdoteList } from "./components/AnecdoteList";

import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { useEffect } from "react";
import { initializeAnectotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //Init Notification
    dispatch(setNotification("Hello World"));
    setTimeout(() => {
      dispatch(setNotification(""));
    }, 1000);

    dispatch(initializeAnectotes());
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
