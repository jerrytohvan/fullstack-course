import { useDispatch } from 'react-redux'
import { createAnecdote } from './reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNewAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div><input name="note"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
