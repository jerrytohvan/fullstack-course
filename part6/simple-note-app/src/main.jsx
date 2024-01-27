import ReactDOM from 'react-dom/client'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import noteReducer, { createNote } from './reducers/noteReducer'
import { filterChange, filterReducer } from './reducers/filterReducer'
import { Provider } from 'react-redux'

import App from './App.jsx'

const store = configureStore({ reducer: {
  notes: noteReducer,
  filter: filterReducer
} })


store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange('IMPORTANT'))
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)


// https://fullstackopen.com/en/part6/many_reducers#redux-toolkit
