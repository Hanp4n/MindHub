import React, { useEffect, useState } from "react";
import koroLangIcon from "../icons/korolang-icon.svg";
import koroMathIcon from "../icons/koromath-icon.svg";
import koroCodeIcon from "../icons/korocode-icon.svg";
import abrir from "../icons/open.svg";
import trespuntos from "../icons/3-puntos.svg";
import descargar from "../icons/descargar.svg";
import { Button } from "../components/ui/button";
import DialogProgress from "../dialogComponents/DialogProgress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import DialogInfo from "../dialogComponents/DialogInfo";
import DialogConfirm from "../dialogComponents/DialogConfirm";

type MHAppProps = {
  nombreApp: string;
  instalado: boolean;
  imgApp: string;
  colorApp: string;
  changeClick: () => void;
  changeInstall?: () => void;
  onDelete?: () => void;
};

const MindHubApp = ({ nombreApp, colorApp, instalado, imgApp, changeClick, onDelete, changeInstall }: MHAppProps) => {
  const [isOpeningChangeLog, setIsOpeningChangeLog] = useState(false);
  const [isOpeningDelete, setIsOpeningDelete] = useState(false);
  const [isOpeningInstalling, setIsOpeningInstalling] = useState(false);
  const [isOpeningProgressBar, setIsOpeningProgressBar] = useState(false);
  function handleEliminar(){
    setIsOpeningDelete(false);
    onDelete && onDelete();
  }

  function handleInstalar(){
    changeInstall && changeInstall();
  }

  return (
    <div id="korolang" className="flex flex-col gap-2">
      {isOpeningChangeLog && <DialogInfo mensaje="v1.2: Conexión a la API de OpenAI implementada." onClose={() => setIsOpeningChangeLog(false)} titulo="ChangeLog"/>}
      {isOpeningDelete && <DialogConfirm titulo= {`¿Eliminar ${nombreApp}?`} onNo={() => setIsOpeningDelete(false)} onYes={handleEliminar}/>}
      {isOpeningInstalling && <DialogConfirm titulo= {`Instalar ${nombreApp}?`} onNo={() => setIsOpeningInstalling(false)} onYes={() => {setIsOpeningInstalling(false);setIsOpeningProgressBar(true)}}/> }
      {isOpeningProgressBar && <DialogProgress titulo={`Instalando ${nombreApp}...`} onCompleted={handleInstalar} changeActiva={() => setIsOpeningProgressBar(false) }/>}
      <div
        className={"cursor-pointer p-7 rounded-2xl flex justify-center items-center w-40 h-40"}
        style={{ backgroundColor: instalado ? colorApp : "var(--mh-light-gray)" }}
        onClick={instalado ? changeClick : () => {}}
      >
        <img src={imgApp} />
      </div>
      <p>{nombreApp}</p>
      <span className="flex justify-between">
        {instalado ? (
          <Button onClick={changeClick} variant={"bordered"}>
            <p>Abrir</p>
            <img className="w-4 h-4" src={abrir} />
          </Button>
        ) : (
          <Button onClick={() => setIsOpeningInstalling(true)} variant={"bordered"}>

            <p>Instalar</p>
            <img className="w-4 h-4" src={descargar} />
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <img src={trespuntos} className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>{nombreApp}</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setIsOpeningChangeLog(true)}>
                Changelog
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsOpeningDelete(true)}>
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </span>
    </div>
  );
};



const Libreria = () => {
  const [isOpeningKoroLang, setIsOpeningKoroLang] = useState(false);
  const [isOpeningKoroMath, setIsOpeningKoroMath] = useState(false);
  const [isOpeningKoroCode, setIsOpeningKoroCode] = useState(false);
  const [filterApps, setFilterApps] = useState("todos");
  const [apps, setApps] = useState<MHAppProps[]>([
    {
      nombreApp: "KoroLang",
      imgApp: koroLangIcon,
      instalado: true,
      colorApp: "var(--mh-dark-red)",
      changeClick: () => setIsOpeningKoroLang(true),
    },

    {
      nombreApp: "KoroMath",
      imgApp: koroMathIcon,
      instalado: true,
      colorApp: "var(--mh-light-turquoise)",
      changeClick: () => setIsOpeningKoroMath(true),
    },
    {
      nombreApp: "KoroCode",
      imgApp: koroCodeIcon,
      instalado: false,
      colorApp: "var(--mh-mid-dark-green)",
      changeClick: () => setIsOpeningKoroCode(true)
    }
  ]);


  function handleKoroLangOpen() {
    window.ipcRenderer.send('abrir-korolang');
    window.close();
  }
  function appFilter(app: MHAppProps) {
      switch (filterApps) {
        case "todos":
          if (app) {
            return true;
          }
          break;
        case "instalados":
          if (app.instalado) {
            return true;
          }
          break;
        case "disponibles":
          if (!app.instalado) {
            return true;
          }
          break;
      }
    
  }


  return (
    <>

      {isOpeningKoroLang && <DialogProgress titulo="Abriendo Korolang..." 
        onCompleted={handleKoroLangOpen}
        changeActiva={(changeActivaValue: boolean) => setIsOpeningKoroLang(changeActivaValue)}
      />}
      {isOpeningKoroMath && <DialogInfo titulo="Error de localización" onClose={() => setIsOpeningKoroMath(false)} mensaje="Archivo no encontrado en la ruta especificada."/>}
      {isOpeningKoroCode && <DialogInfo titulo="Error de localización" onClose={() => setIsOpeningKoroCode(false)} mensaje="Archivo no encontrado en la ruta especificada."/>}
      
      <div className="flex flex-col gap-4 p-6 w-full overflow-y">
        <h1 className="text-2xl font-bold">Librería</h1>
        <div className="flex gap-6 text-xl">
          <p className="cursor-pointer" style={{ opacity: filterApps === "todos" ? 1 : 0.6 }} onClick={() => setFilterApps("todos")}>Todos</p>
          <p className="cursor-pointer" style={{ opacity: filterApps === "instalados" ? 1 : 0.6 }} onClick={() => setFilterApps("instalados")}>Instalados</p>
          <p className="cursor-pointer" style={{ opacity: filterApps === "disponibles" ? 1 : 0.6 }} onClick={() => setFilterApps("disponibles")}>Disponibles</p>
        </div>
        <div className="flex gap-10 flex-wrap">
          {apps.map(app => {
            if (appFilter(app)) {
              return (
                <MindHubApp
                  nombreApp={app.nombreApp}
                  imgApp={app.imgApp}
                  instalado={app.instalado}
                  colorApp={app.colorApp}
                  changeClick={app.changeClick}
                  onDelete={() => {
                    setApps((prev) =>
                      prev.filter((a) => a.nombreApp !== app.nombreApp)
                    );
                  }}
                  changeInstall={() => {
                    setApps((prev) =>
                      prev.map((a) =>
                        a.nombreApp === app.nombreApp ? { ...a, instalado: true } : a
                      )
                    );
                  }}
                />
              )
            }
          })}
        </div>
      </div>
    </>
  );
}

export default Libreria;

