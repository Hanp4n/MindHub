import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import monigote from './icons/monigote.svg';
import accesibilidad from './icons/accesibilidad.svg';
import notificaciones from './icons/notificacion.svg';
import nube from './icons/nube.svg';
import hdd from './icons/hdd.svg';
import descargas from './icons/descargar.svg'
import iconoCuenta from './icons/icono-cuenta.svg'
import Notificaciones from './icons/notificacion.svg';
import cerrar from './icons/Cerrar.svg'
import { Session } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import { session } from 'electron';
import BorderedButton from './BorderedButton';
import Cuenta from './MindHubConfigTabs/Cuenta';
import Accesibilidad from './MindHubConfigTabs/Accesibilidad';
import NotificacionesTab from './MindHubConfigTabs/Notificaciones';
import Almacenamiento from './MindHubConfigTabs/Almacenamiento';
import Descargas from './MindHubConfigTabs/Descargas';


type Props = {}

type MHConfigTabProps = {
    nombreTab: string,
    imgTab: string,
    path: string
}

const MindHubConfigTab = ({ nombreTab, imgTab, path }: MHConfigTabProps) => {
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
      className={`mhtab ${isActive ? 'mhtabselected' : ''}`}
    >
      <div className="w-4 h-4">
        <img src={imgTab} />
      </div>
      <p>{nombreTab}</p>
    </button>
  );
};

const MindHubConfigPageMenu = () => {
    return (
        <div className='border-r flex flex-col gap-10 p-3'>
            <h1 className='text-xl font-bold'>Configuración</h1>
            <div className='flex flex-col gap-4'>
                <MindHubConfigTab nombreTab='Cuenta' imgTab={monigote} path='MHcuenta'/>
                <MindHubConfigTab nombreTab='Accesibilidad' imgTab={accesibilidad} path='MHaccesibilidad'/>
                <MindHubConfigTab nombreTab='Notificaciones' imgTab={notificaciones} path='MHNotificaciones'/>
                <MindHubConfigTab nombreTab='Nube' imgTab={nube} path='MHNube'/>
                <MindHubConfigTab nombreTab='Almacenamiento' imgTab={hdd} path='MHAlmacenamiento'/>
                <MindHubConfigTab nombreTab='Descargas' imgTab={descargas} path='MHDescargas'/>
            </div>
        </div>
    )
}

const MindHubConfig = () => {

  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === '/config') {
      navigate("/config/MHcuenta", { replace: true });
    }
  }, [navigate, location.pathname])

  return (
    <div className='fixed inset-0 bg-black/25 flex items-center justify-center z-99 w-screen'>
        <div className='bg-background p-7 rounded-2xl shadow-2xl flex gap-4 w-fit'>
            <MindHubConfigPageMenu/>
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

export default MindHubConfig