import NewNote from './NewNote'
import Notes from './Notes'
import VisibilityFilter from './VisibilityFilter'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
  }, [])

  return (
    <>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </>
  )
}

export default App
