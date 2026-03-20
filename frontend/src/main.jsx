import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import faviconUrl from './assets/cracked_favicon.png'

const faviconLink = document.createElement('link')
faviconLink.rel = 'icon'
faviconLink.type = 'image/png'
faviconLink.href = faviconUrl
document.head.appendChild(faviconLink)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)