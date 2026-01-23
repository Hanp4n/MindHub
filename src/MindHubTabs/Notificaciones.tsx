import React, { useState } from "react";
import abrir from "../icons/open.svg";
import masInfoIcon from "../icons/masInfo.svg";
import papelera from "../icons/papelera.svg";
import advertencia from "../icons/advertencia.svg";
import nuevaTarea from "../icons/nuevaTarea.svg";
import vencidaTarea from "../icons/vencida.svg";
import exitoTarea from "../icons/exitoTarea.svg";
import BorderedButton from "../BorderedButton";
import { Button } from "../components/ui/button";
import DialogInfo from "../dialogComponents/DialogInfo";
import { TooltipPref } from "../components/ui/tooltipPref";

type NotificacionObj = {
  nombreApp: string,
  nombreTarea: string,
  fechaNotificacion: string,
  horaNotificacion: string
}

type NotificacionProps = {
  imgNotificacion: string,
  bgColor: string,
  infoNotificacion: NotificacionObj,
  vencida: boolean,
  changeAbrir?: () => void,
  masInfo: string
}

const Notificacion = ({ imgNotificacion, bgColor, infoNotificacion, changeAbrir, vencida, masInfo }: NotificacionProps) => {
  const [isOpeningMasInfo, setIsOpeningMasInfo] = useState(false);

  function handleAbrir(){
    if(changeAbrir){
      changeAbrir();
    }
  }

  return (
    <div 
      className="flex items-center justify-between hover:bg-gray-100 p-3 cursor-pointer"
    >
      {isOpeningMasInfo && <DialogInfo titulo="Más información" mensaje={masInfo} onClose={() => setIsOpeningMasInfo(false)}/>}
      <div className="flex gap-4 h-full">
        <div className={"cursor-pointer border border-[var(--mh-dark-gray)] rounded-xl flex justify-center items-center w-20 h-20"}
          style={{backgroundColor: bgColor}}
        >
          <div className="w-6">
            <img src={imgNotificacion} />
          </div>
        </div>

        <div className="flex flex-col h-full justify-around">
          <p>
            <TooltipPref contenedor={<span className="font-bold">{infoNotificacion.nombreApp}: </span> } contenido={<p>Nombre de la aplicación</p>}/>
            
            <span>{infoNotificacion.nombreTarea}</span>
          </p>
          <p>{infoNotificacion.fechaNotificacion} - {infoNotificacion.horaNotificacion}</p>
        </div>
      </div>

      <div className="flex gap-5">
        {!vencida && (
          <Button onClick={handleAbrir} variant={"bordered"}>
            <img src={abrir} />
            <p>Abrir</p>
          </Button>
        )}
        <Button onClick={() => setIsOpeningMasInfo(true)} variant={"bordered"}>
          <img src={masInfoIcon} />
          <p>Más información</p>
        </Button>
      </div>

    </div>
  );
};


const Notificaciones = () => {
  return (
    <div className="flex flex-col gap-10 p-6 w-full overflow-y-visible">
      <h1 className="text-2xl font-bold">Notificaciones</h1>
      <div className="flex flex-col gap-7">
        <Notificacion 
        vencida={false}
        masInfo="Quedan 2 días para la entrega de: 10 minute conversation. Fecha límite: 10 nov 2025 - 23:59"
        changeAbrir={() => window.ipcRenderer.send('abrir-korolang')}
        infoNotificacion={{
          nombreApp: "KoroLang",
          nombreTarea: "10 minute conversation",
          fechaNotificacion: "8 nov 2025",
          horaNotificacion: "17:00"
        }}
        bgColor={"var(--mh-yellow)"} 
        imgNotificacion={advertencia} />

        <Notificacion 
        vencida={false}
        masInfo="Se ha creado una nueva tarea: Social Media Essay. Fecha límite: 20 nov 2025 - 23:59"
        changeAbrir={() => window.ipcRenderer.send('abrir-korolang')}
        infoNotificacion={{
          nombreApp: "KoroLang",
          nombreTarea: "Social Media Essay",
          fechaNotificacion: "9 nov 2025",
          horaNotificacion: "22:00"
        }}
        bgColor={"var(--mh-blue)"} 
        imgNotificacion={nuevaTarea} />

        <Notificacion 
        vencida={true}
        masInfo="Se ha vencido el plazo de: Code documentation."
        infoNotificacion={{
          nombreApp: "KoroLang",
          nombreTarea: "Code documentation",
          fechaNotificacion: "9 nov 2025",
          horaNotificacion: "23:59"
        }}
        bgColor={"var(--mh-red)"} 
        imgNotificacion={vencidaTarea} />

        <Notificacion 
        vencida={true}
        masInfo="Se entregó en plazo la tarea: 10 minute conversation."
        infoNotificacion={{
          nombreApp: "KoroLang",
          nombreTarea: "10 minute conversation",
          fechaNotificacion: "9 nov 2025",
          horaNotificacion: "23:59"
        }}
        bgColor={"var(--mh-green)"} 
        imgNotificacion={exitoTarea} />
      </div>
    </div>
  );
}

export default Notificaciones;

