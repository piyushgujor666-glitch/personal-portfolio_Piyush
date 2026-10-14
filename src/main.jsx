import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

const saved = (() => {
  try { return localStorage.getItem('theme') } catch { return null }
})()
document.documentElement.dataset.theme = saved === 'light' ? 'light' : 'dark'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
