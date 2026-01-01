import React from 'react'
import ReactDOM from 'react-dom/client'
import '../index.css'
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

// Obtener el elemento root
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Make sure there is a <div id="root"></div> in your HTML.');
}

// Renderizar la aplicación
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
)

// Configurar ipcRenderer si está disponible (solo en Electron)
if (typeof window !== 'undefined' && window.ipcRenderer) {
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log('Main process message:', message)
  })
}
