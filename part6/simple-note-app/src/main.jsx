import ReactDOM from 'react-dom/client'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './reducers/noteReducer'
import { filterReducer } from './reducers/filterReducer'
import { Provider } from 'react-redux'

import App from './App.jsx'

const store = configureStore({ reducer: {
  notes: noteReducer,
  filter: filterReducer
} })

store.subscribe(() => console.log(store.getState()))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
