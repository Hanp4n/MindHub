import { useEffect, useState } from "react";
import {supabase} from './supabaseClient'

import mindhubIcono from "./icons/mindhub-icon.svg";
import descargar from "./icons/descargar.svg";
import libreria from "./icons/libreria.svg";
import estadistica from "./icons/estadistica.svg";
import notificacion from "./icons/notificacion.svg";
import iconoCuenta from "./icons/icono-cuenta.svg";
import salirIcon from "./icons/salir.svg"
import ayudaIcon from "./icons/ayudaIcon.svg"

import { Session } from "@supabase/supabase-js";
import DialogConfirm from "./dialogComponents/DialogConfirm";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

type MHTabProps = {
  nombreTab: string;
  imgTab: string;
  path: string;
};

const MindHubTab = ({ nombreTab, imgTab, path }: MHTabProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Detectar si la ruta actual coincide con esta tab
  // En rutas anidadas, location.pathname será "/libreria", "/actualizaciones", etc.
  const currentPath = location.pathname;
  const isActive = currentPath === `/${path}` || 
                   (path === "libreria" && (currentPath === "/" || currentPath === ""));

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Usar ruta relativa para rutas anidadas (sin opciones adicionales)
    navigate(path);
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

type MindHubPageMenuProps = {
  changeQuitting: (value: boolean) => void
}

const MindHubPageMenu = ({changeQuitting}: MindHubPageMenuProps) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
    });
  }, [])
  
  const navigate = useNavigate()

  return (
    <div className="w-70 p-5 px-8 flex flex-col justify-between gap-10
    border-r border-[var(--mh-light-gray)]">
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10">
            <img src={mindhubIcono} />
          </div>  
          <p className="text-2xl">MindHub</p>
        </div>
        <div className="flex flex-col gap-2">
          <MindHubTab nombreTab="Librería" imgTab={libreria} path="libreria" />
          <MindHubTab nombreTab="Actualizaciones" imgTab={descargar} path="actualizaciones" />
          <MindHubTab nombreTab="Notificaciones" imgTab={notificacion} path="notificaciones" />
          <MindHubTab nombreTab="Rendimiento" imgTab={estadistica} path="rendimiento" />
        </div>
      </div>
      <div className="flex flex-col gap-5 cursor-pointer">
        <div onClick={() => changeQuitting(true)} className="flex gap-3">
          <div className="w-6">
            <img src={salirIcon} />
          </div>
          <p>Salir</p>
        </div>
        {/* <div onClick={() => window.ipcRenderer.send("abrir-ayudamh")} className="flex gap-3">
          <div className="w-6">
            <img src={ayudaIcon} />
          </div>
          <p>Ayuda</p>
        </div> */}
        <div onClick={() => {
          navigate("/config")
        }
        }
        className="w-full border border-[var(--mh-gray)]
        flex items-center gap-2
        rounded-xl
        p-3 py-2
        cursor-pointer">
          <div className="w-10">
            <img src={iconoCuenta} />
          </div>
          <p>{session?.user.email?.substring(0, 5)}...</p>
        </div>
      </div>
    </div>
  );
};


const MindHubHome = () => {
  const [isQuitting, setIsQuitting] = useState(false); 

  const navigate = useNavigate();
  const location = useLocation();

  const onQuit = () => {
    window.close();
  }
  
  const onCancelQuitting = () => {
    setIsQuitting(false);
  }

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "") {
      navigate("libreria", { replace: true });
    }
  }, [navigate, location.pathname])

  
  
  return (
    <div className="flex h-screen">
      {isQuitting && <DialogConfirm titulo="¿Salir de MindHub?" onYes={onQuit} onNo={onCancelQuitting}/>}
      {/* {isOpeningConfig && <MindHubConfig changeIsOpening={setIsOpeningConfig}/>} */}
    
      <MindHubPageMenu changeQuitting={setIsQuitting}/>
      <div className="overflow-scroll overflow-x-hidden w-full">
        <Outlet/>
      </div>
    </div>
  );
};

export default MindHubHome;
