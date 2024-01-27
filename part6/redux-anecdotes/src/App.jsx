import { AnecdoteFilter } from "./AnecdoteFilter";
import { AnecdoteForm } from "./AnecdoteForm";
import { AnecdoteList } from "./AnecdoteList";

const App = () => {
  return (
    <div>
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
