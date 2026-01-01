import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import cerrar from '../icons/Cerrar.svg'
import accesibilidadIcon from '../icons/accesibilidad.svg'
import lenguajeIcon from '../icons/lenguaje.svg'
import profesorIcon from '../icons/monigote.svg'


type Props = {}

type KLConfigTabProps = {
    nombreTab: string,
    imgTab: string,
    path: string
}

const KoroLangConfigTab = ({ nombreTab, imgTab, path }: KLConfigTabProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname.endsWith(path);
                   


  const handleClick = (e: React.MouseEvent) => {
    // Usar ruta relativa para rutas anidadas (sin opciones adicionales)
    e.preventDefault();
    navigate("/config/"+path);
  };

  return (
    <button 
      onClick={handleClick}
      className={`kltab ${isActive ? 'kltabselected' : ''}`}
    >
      <div className="w-4 h-4">
        <img src={imgTab} />
      </div>
      <p>{nombreTab}</p>
    </button>
  );
};

const KoroLangConfigPageMenu = () => {
    return (
        <div className='border-r flex flex-col gap-10 p-3'>
            <h1 className='text-xl font-bold'>Configuración</h1>
            <div className='flex flex-col gap-4'>
                <KoroLangConfigTab nombreTab='Profesor' imgTab={profesorIcon} path='KLProfesor'/>
                <KoroLangConfigTab nombreTab='Idioma' imgTab={lenguajeIcon} path='KLIdioma'/>
                <KoroLangConfigTab nombreTab='Accesibilidad' imgTab={accesibilidadIcon} path='KLAccesibilidad'/>
            </div>
        </div>
    )
}

const KoroLangConfig = () => {

  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === '/config') {
      navigate("/config/KLProfesor", { replace: true });
    }
  }, [navigate, location.pathname])

  return (
    <div className='fixed inset-0 bg-black/25 flex items-center justify-center z-99 w-screen'>
        <div className='bg-background p-7 rounded-2xl shadow-2xl flex gap-4 w-fit'>
            <KoroLangConfigPageMenu/>
            <div className="flex-1">
              <Outlet />
            </div>
            <div onClick={() => {
              navigate("/")
              }} className='w-5 h-5 cursor-pointer'>
                <img src={cerrar}/>
            </div>
        </div>
    </div>
  )
}

export default KoroLangConfig