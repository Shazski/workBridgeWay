import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { persistor, store } from "./redux/store.ts"
import { PersistGate } from "redux-persist/integration/react"
import { Provider } from 'react-redux'
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter as Router } from 'react-router-dom'
import { SocketProvider } from './context/SocketContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <SocketProvider>
            <Router>
              <App />
            </Router>
          </SocketProvider>
        </ThemeProvider>ku
      </PersistGate>
    </Provider>
)
