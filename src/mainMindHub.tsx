import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import MindHubHome from './MindHubHome.tsx'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import Libreria from './MindHubTabs/Libreria.tsx'
import Actualizaciones from './MindHubTabs/Actualizaciones.tsx'
import Notificaciones from './MindHubTabs/Notificaciones.tsx'
import Rendimiento from './MindHubTabs/Rendimiento.tsx'
import MindHubConfig from './MindHubConfig.tsx'
import Cuenta from './MindHubConfigTabs/Cuenta.tsx'
import Accesibilidad from './MindHubConfigTabs/Accesibilidad.tsx'
import NotificacionesConfig from './MindHubConfigTabs/Notificaciones.tsx'
import Almacenamiento from './MindHubConfigTabs/Almacenamiento.tsx'
import Descargas from './MindHubConfigTabs/Descargas.tsx'
import { ThemeProvider } from "./theme-provider.tsx"
import {supabase} from './supabaseClient'
import { Session } from '@supabase/supabase-js'
import { AppProvider } from './AppContext.tsx'
import Nube from './MindHubConfigTabs/Nube.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppProvider>
        <HashRouter>
          <Routes>
              <Route path="/" element={<MindHubHome />}>
                <Route index element={<Libreria />} />
                <Route path="libreria" element={<Libreria />} />
                <Route path="actualizaciones" element={<Actualizaciones />} />
                <Route path="notificaciones" element={<Notificaciones />} />
                <Route path="rendimiento" element={<Rendimiento />} />
                <Route path="config" element={<MindHubConfig/>}>
                  <Route index element={<Cuenta/>} />
                  <Route path="MHcuenta" element={<Cuenta />} />
                  <Route path="MHaccesibilidad" element={<Accesibilidad />} />
                  <Route path="MHnotificaciones" element={<NotificacionesConfig />} />
                  <Route path="MHNube" element={<Nube />} />
                  <Route path="MHalmacenamiento" element={<Almacenamiento />} />
                  <Route path="MHdescargas" element={<Descargas />} />
                </Route>
              </Route>
            </Routes>
        </HashRouter>
      </AppProvider>
    </ThemeProvider>
  </React.StrictMode>
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
