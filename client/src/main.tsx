import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { persistor, store } from "./redux/store.ts"
import { PersistGate } from "redux-persist/integration/react"
import { Provider } from 'react-redux'
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
        <Router>
          <App />
        </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
