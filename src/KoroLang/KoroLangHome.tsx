import { useEffect, useState } from "react";
import {supabase} from '../supabaseClient'

import mindhubIcono from "../icons/mindhub-icon.svg";
import descargar from "../icons/descargar.svg";
import libreria from "../icons/libreria.svg";
import estadistica from "../icons/estadistica.svg";
import notificacion from "../icons/notificacion.svg";
import iconoCuenta from "../icons/icono-cuenta.svg";
import salirIcon from "../icons/salir.svg"
import ojoIcon from "../icons/ojo.svg"
import escribirIcon from "../icons/nuevaTarea.svg"
import microIcon from "../icons/micro.svg"
import exitoIcon from "../icons/exitoTarea.svg"
import chatIcon from "../icons/chat.svg"
import casaIcon from "../icons/casa.svg"
import koroLangLogo from "../icons/koroLangLogo.svg"
import engranajeIcon from "../icons/engranaje.svg"

import { Session } from "@supabase/supabase-js";
import DialogConfirm from "../dialogComponents/DialogConfirm";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import KoroLangStart from "./KoroLangStart";
import DialogInfo from "../dialogComponents/DialogInfo";


import ayudaIcon from "../icons/ayudaIcon.svg"


type KLTabProps = {
  nombreTab: string;
  imgTab: string;
  path: string;
};

const KoroLangTab = ({ nombreTab, imgTab, path }: KLTabProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Detectar si la ruta actual coincide con esta tab
  // En rutas anidadas, location.pathname será "/inicio", "/leer", etc.
  const currentPath = location.pathname;
  const isActive = currentPath === `/${path}` || 
                   (path === "inicio" && (currentPath === "/" || currentPath === ""));

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Usar ruta relativa para rutas anidadas (sin opciones adicionales)
    navigate(path);
  };

  return (
    <button 
      onClick={handleClick}
      className={`kltab ${isActive ? 'kltabselected' : ''}`}
    >
      <div className="w-[18px]">
        <img src={imgTab} />
      </div>
      <p>{nombreTab}</p>
    </button>
  );
};

type KoroLangPageMenuProps = {
  changeQuitting: (value: boolean) => void,
  changeOpeningConfig: (value: boolean) => void
}

const KoroLangPageMenu = ({changeQuitting, changeOpeningConfig}: KoroLangPageMenuProps) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
    });
  }, [])
  const navigate = useNavigate();

  return (
    <div className="w-fit p-5 px-8 flex flex-col justify-between gap-10
    border-r border-[var(--mh-light-gray)]">
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10">
            <img src={koroLangLogo} />
          </div>
          <p className="text-2xl">KoroLang</p>
        </div>
        <div className="flex flex-col gap-2">
          <KoroLangTab nombreTab="Inicio" imgTab={casaIcon} path="inicio" />
          <KoroLangTab nombreTab="Leer" imgTab={ojoIcon} path="leer" />
          <KoroLangTab nombreTab="Escribir" imgTab={escribirIcon} path="escribir" />
          <KoroLangTab nombreTab="Hablar" imgTab={microIcon} path="hablar" />
          <KoroLangTab nombreTab="Tareas" imgTab={exitoIcon} path="tareas" />
          <KoroLangTab nombreTab="Chat" imgTab={chatIcon} path="chat" />
        </div>
      </div>
      <div className="flex flex-col gap-5 cursor-pointer">
        {/* <div onClick={() => window.ipcRenderer.send("abrir-ayudakl")} className="flex gap-3">
          <div className="w-6">
            <img src={ayudaIcon} />
          </div>
          <p>Ayuda</p>
        </div> */}
        <div onClick={() => changeQuitting(true)} className="flex gap-3">
          <div className="w-6">
            <img src={salirIcon} />
          </div>
          <p>Salir</p>
        </div>
        <div onClick={() => navigate("/config")}
        className="w-full 
        flex items-center gap-2
        py-2
        cursor-pointer">
          <div className="w-8">
            <img src={engranajeIcon} />
          </div>
          <p>Configuración</p>
        </div>
      </div>
    </div>
  );
};


const KoroLangHome = () => {
  const [isQuitting, setIsQuitting] = useState(false);
  const [isOpeningConfig, setIsOpeningConfig] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const [idioma, setIdioma] = useState("");
  const [idiomaVacioDialog, setIdiomaVacioDialog] = useState(false);

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
      navigate("inicio", { replace: true });
    }
  }, [navigate, location.pathname])
  
  function handleKLStartClose(){
    if(!idioma){
      setIdiomaVacioDialog(true);
      return;
    }
    setFirstTime(false);
  }

  return (
    <div className="flex h-screen">
      {idiomaVacioDialog && <DialogInfo titulo="Error de acceso" onClose={() => setIdiomaVacioDialog(false)}  mensaje="Por favor, escoge un idioma."/>}
      {firstTime && <KoroLangStart changeIdioma={(value: string) => setIdioma(value)} onClose={handleKLStartClose}/>}
      {isQuitting && <DialogConfirm buttonColor="var(--mh-dark-red)" titulo="¿Salir de KoroLang?" onYes={onQuit} onNo={onCancelQuitting}/>}
      {/* {isOpeningConfig && <MindHubConfig changeIsOpening={setIsOpeningConfig}/>} */}
      <KoroLangPageMenu changeOpeningConfig={setIsOpeningConfig} changeQuitting={setIsQuitting}/>
      <div className="overflow-scroll overflow-x-hidden w-full">
        <Outlet/>
      </div>
    </div>
  );
};

export default KoroLangHome;
