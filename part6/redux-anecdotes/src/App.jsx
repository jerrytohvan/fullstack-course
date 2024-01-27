import { AnecdoteFilter } from "./components/AnecdoteFilter";
import { AnecdoteForm } from "./components/AnecdoteForm";
import { AnecdoteList } from "./components/AnecdoteList";
import { Notification } from "./components/Notification";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  dispatch(setNotification("Hello World"));
  setTimeout(() => { dispatch(setNotification("")) }, 5000);
  return (
    <div>
      <Notification />
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
