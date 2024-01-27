import ReactDOM from 'react-dom/client'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import noteReducer, { setNotes } from './reducers/noteReducer'
import { filterReducer } from './reducers/filterReducer'
import { Provider } from 'react-redux'

import App from './App.jsx'
import noteService from '../services/notes'

const store = configureStore({ reducer: {
  notes: noteReducer,
  filter: filterReducer
} })

store.subscribe(() => console.log(store.getState()))

noteService.getAll().then(notes =>
  store.dispatch(setNotes(notes))
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
