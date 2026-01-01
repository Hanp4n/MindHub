import React, { useState } from 'react'
import masIcon from "../../icons/generar.svg"
import { Button } from '../../components/ui/button';
import escribir from "../../icons/nuevaTarea.svg"
import masInfoIcon from "../../icons/masInfo.svg"
import ojoIcon from "../../icons/ojoNegro.svg"
import trespuntos from "../../icons/3-puntos.svg"
import Editor from '../KoroLangFeatures/Editor';
import DialogInfo from '../../dialogComponents/DialogInfo';

type Props = {}

type ArchivoEscribirProps = {
    nombre: string;
    contenido?: string;
    retroalimentacion?: string;
    changeClick?: () => void;
}

const ArchivoEscribir = ({nombre, retroalimentacion, changeClick}: ArchivoEscribirProps) => {
    const [isOpeningRetroalimentacion, setIsOpeningRetroalimentacion] = useState(false);


    return (
        <div className='flex w-full justify-between'>
            {isOpeningRetroalimentacion && <DialogInfo onClose={() => setIsOpeningRetroalimentacion(false)} titulo='Retroalimentación' mensaje={retroalimentacion}/>}
            <div className='flex gap-2 items-center justify-center'>
                <div className='flex items-center justify-center 
                aspect-square h-full rounded-md bg-[var(--mh-light-gray)] w-12'>
                    <img className='w-5' src={escribir}/>
                </div>
                <p>{nombre}</p>
            </div>
            <div className='flex gap-3 items-center'>
                <Button className='flex' variant={"bordered"}>
                    <img src={masInfoIcon}/>
                    <p>Retroalimentación</p>
                </Button>
                <Button onClick={changeClick} className='flex' variant={"klDefault"}>
                    <img className='w-4' src={escribir}/>
                    <p>Escribir</p>
                </Button>
                <img src={trespuntos} className="cursor-pointer w-3 rotate-90" />
            </div>
        </div>
    )
}

const Escribir = (props: Props) => {

    const [isOpeningEditor, setIsOpeningEditor] = useState(false);

    const archivosDemo: ArchivoEscribirProps[] = [
        {
            nombre: "Social Media Essay",
            retroalimentacion: "En vez de utilizar 'all day', utiliza 'whole day'."
        },
        {
            nombre: "About Polish Culture",
            retroalimentacion: "En vez de utilizar 'all day', utiliza 'whole day'."
        }
        
    ]

  return (
      <div className="flex flex-col gap-10 p-6 w-full overflow-y">
        {isOpeningEditor && <Editor onClose={()=> setIsOpeningEditor(false)}/>}
        
        <h1 className="text-2xl font-bold">Escribir</h1>
        <Button onClick={() => setIsOpeningEditor(true)} variant={"klDefault"}>
            <div className="w-4"><img src={masIcon} /></div><p>Generar</p>
        </Button>
        <div className='flex flex-col gap-4'>
            {
                archivosDemo.map((archivo) => <ArchivoEscribir changeClick={() => setIsOpeningEditor(true)} nombre={archivo.nombre}/>)
            }
        </div>
      </div>
    );
}

export default Escribir