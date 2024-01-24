import ReactDOM from 'react-dom/client'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import { noteReducer } from './reducers/noteReducer'
import { Provider } from 'react-redux'

import App from './App.jsx'

const store = configureStore({ reducer: noteReducer })

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
