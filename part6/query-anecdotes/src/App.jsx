import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getAnecdotes } from "./requests";

//https://fullstackopen.com/en/part6/react_query_use_reducer_and_the_context#exercises-6-20-6-22
const App = () => {
  // const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (isLoading) {
    return <div>loading data...</div>;
  }

  if (isError) {
    return (
      <div>
        {" "}
        <p>
          anecdote server is not available due to problems in server:{" "}
          {error.message}
        </p>
      </div>
    );
  }

  const handleVote = (anecdote) => {
    console.log("vote");
  };

  const anecdotes = data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
