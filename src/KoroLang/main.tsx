import React from 'react'
import ReactDOM from 'react-dom/client'
import '../index.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import KoroLangHome from './KoroLangHome'
import Inicio from './KoroLangTabs/Inicio'
import Leer from './KoroLangTabs/Leer'
import Escribir from './KoroLangTabs/Escribir'
import Hablar from './KoroLangTabs/Hablar'
import Tareas from './KoroLangTabs/Tareas'
import Chat from './KoroLangTabs/Chat'
import KoroLangConfig from './KoroLangConfig'
import Profesor from './KoroLangConfigTabs/Profesor'
import Idioma from './KoroLangConfigTabs/Idioma'
import Accesibilidad from './KoroLangConfigTabs/Accesibilidad'
import { ThemeProvider } from "../theme-provider"
import { AppProvider } from '../AppContext'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppProvider>
        <HashRouter>
          <Routes>
              <Route path="/" element={<KoroLangHome />}>
                <Route index element={<Inicio />} />
                <Route path="inicio" element={<Inicio />} />
                <Route path="leer" element={<Leer />} />
                <Route path="escribir" element={<Escribir />} />
                <Route path="hablar" element={<Hablar />} />
                <Route path="tareas" element={<Tareas />} />
                <Route path="chat" element={<Chat />} />
                <Route path="config" element={<KoroLangConfig/>}>
                  <Route index element={<Profesor/>} />
                  <Route path="KLProfesor" element={<Profesor />} />
                  <Route path="KLIdioma" element={<Idioma />} />
                  <Route path="KLAccesibilidad" element={<Accesibilidad />} />
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
