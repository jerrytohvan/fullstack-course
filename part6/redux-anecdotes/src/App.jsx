import { AnecdoteFilter } from "./components/AnecdoteFilter";
import { AnecdoteForm } from "./components/AnecdoteForm";
import { AnecdoteList } from "./components/AnecdoteList";

import { useDispatch } from "react-redux";
import { addNewNotification } from "./reducers/notificationReducer";
import { useEffect } from "react";
import { initializeAnectotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //Init Notification
    dispatch(addNewNotification("Hello World", 5));

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
