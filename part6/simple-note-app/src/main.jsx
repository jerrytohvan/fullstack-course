import ReactDOM from 'react-dom/client'
import './index.css'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { noteReducer, createNote } from './reducers/noteReducer'
import { filterChange, filterReducer } from './reducers/filterReducer'
import { Provider } from 'react-redux'

import App from './App.jsx'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = configureStore({ reducer })


store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange('IMPORTANT'))
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
