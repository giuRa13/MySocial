import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { SocketContextProvider } from './context/SocketContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  // "StrictMode" renders every compoonent twice, ONLY IN DEVELOPMENT MODE
  <React.StrictMode> 
    <RecoilRoot>
      <BrowserRouter>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
)
