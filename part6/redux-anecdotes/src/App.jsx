import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const sortedAncedotes = anecdotes.sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAncedotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
     <AnecdoteForm />
    </div>
  )
}

export default App
