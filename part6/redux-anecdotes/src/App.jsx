import { AnecdoteFilter } from "./components/AnecdoteFilter";
import { AnecdoteForm } from "./components/AnecdoteForm";
import { AnecdoteList } from "./components/AnecdoteList";

import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
  const dispatch = useDispatch();
  dispatch(setNotification("Hello World"));
  setTimeout(() => { dispatch(setNotification("")) }, 1000);

  return (
    <div>
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
