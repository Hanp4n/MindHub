import React, { act, useState } from "react";
import koroMathIcon from "../icons/koromath-icon.svg";
import koroLangIcon from "../icons/korolang-icon.svg";
import descargar from "../icons/descargar.svg";
import BorderedButton from "../BorderedButton";
import { Button } from "../components/ui/button";
import DialogProgress from "../dialogComponents/DialogProgress";

type ActualizacionProps = {
  id: number,
  img: string;
  titleApp: string;
  version: string;
  tamanio: number;
  bgColor: string;
  changeInstalada?: () => void;
}

const Actualizacion = ({ img, titleApp, version, tamanio, bgColor, changeInstalada }: ActualizacionProps) => {
  const [isOpeningProgressBar, setIsOpeningProgressBar] = useState(false);

  function handleInstalada(){
    changeInstalada && changeInstalada();
  }

  return (
    <div className="flex justify-between items-center
    p-4
    hover:bg-gray-100 hover:cursor-pointer">
      {isOpeningProgressBar && <DialogProgress titulo={`Instalando actualización para ${titleApp}...`} changeActiva={(progressBarValue: boolean) => setIsOpeningProgressBar(progressBarValue)} onCompleted={handleInstalada}/>}
      <div className="flex items-center gap-5">
        <div className={"cursor-pointer rounded-xl flex justify-center items-center w-20 h-20"}
        style={{backgroundColor: bgColor}}>
          <img className="w-5" src={img} />
        </div>
        <p className="text-xl">{titleApp}</p>
      </div>
      <p>v {version}</p>
      <p>{tamanio} MB</p>
      <Button onClick={() => setIsOpeningProgressBar(true)} variant={'bordered'}>
        <img className="w-3" src={descargar} />
        <p>Actualizar</p>
      </Button>
    </div>
  );
}

const actualizacionesDemo: ActualizacionProps[] = [
  {
    id: 1,
    version:"1.0.5",
    tamanio:200,
    titleApp:"KoroMath",
    img:koroMathIcon,
    bgColor:"var(--mh-light-turquoise)"
  },
  {
    id: 2,
    version:"1.0.8",
    tamanio:200,
    titleApp:"KoroLang",
    img:koroLangIcon,
    bgColor:"var(--mh-dark-red)"
  },
]

const Actualizaciones = () => {
  const [actualizaciones, setActualizaciones] = useState(actualizacionesDemo);
  const [isActualizandoTodo, setIsActualizandoTodo] = useState(false);
  return (
    <div className="flex flex-col gap-10 p-6 w-full overflow-y">
      {isActualizandoTodo && <DialogProgress titulo="Actualizando todo..." onCompleted={() => setActualizaciones([])} changeActiva={() => setIsActualizandoTodo(false)}/>}
      <h1 className="text-2xl font-bold">Actualizaciones</h1>
      <Button onClick={() => setIsActualizandoTodo(true)} className="justify-baseline w-fit" variant={'bordered'}>
        <img className="w-3" src={descargar} />
        <p>Actualizar todo</p>
      </Button>
      <div className="flex flex-col gap-7">
        {actualizaciones.length === 0 ? <p>Todo está actualizado.</p> : <></>}
        {
            actualizaciones.map(actualizacion => {
                return(
                  <Actualizacion 
                  id={actualizacion.id} 
                  version={actualizacion.version} 
                  tamanio={actualizacion.tamanio} 
                  titleApp={actualizacion.titleApp} 
                  img={actualizacion.img} 
                  bgColor={actualizacion.bgColor} 
                  changeInstalada={() => {
                    setActualizaciones(actualizaciones.filter(nActualizacion => nActualizacion.id !== actualizacion.id))
                  }}/>
                )

            })
        }
        </div>
    </div>
  );
}

export default Actualizaciones;

