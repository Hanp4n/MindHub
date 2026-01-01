import React from 'react'
import masIcon from "../../icons/generar.svg"
import { Button } from '../../components/ui/button';
import archivoIcon from "../../icons/archivo.svg"
import masInfoIcon from "../../icons/masInfo.svg"
import transcripcion from "../../icons/transcripcion.svg"
import trespuntos from "../../icons/3-puntos.svg"
import micro from "../../icons/micNegro.svg"

type Props = {}

type ArchivoHablarProps = {
    nombre: string;
    retroalimentacion?: string;
    transcripcion?: string;
}

const ArchivoHablar = ({nombre}: ArchivoHablarProps) => {
    

    return (
        <div className='flex w-full justify-between'>
            <div className='flex gap-2 items-center justify-center'>
                <div className='flex items-center justify-center 
                aspect-square h-full rounded-md bg-[var(--mh-light-gray)] w-12'>
                    <img className='w-4' src={micro}/>
                </div>
                <p className='w-[100px] overflow-hidden'>{nombre}</p>
            </div>
            <div className='flex gap-3 items-center'>
                <Button className='flex' variant={"bordered"}>
                    <img src={masInfoIcon}/>
                    <p>Retroalimentación</p>
                </Button>
                <Button className='flex' variant={"bordered"}>
                    <img src={transcripcion}/>
                    <p>Transcripción</p>
                </Button>
                <Button className='flex' variant={"klDefault"}>
                    <img className='w-3' src={micro}/>
                    <p>Hablar</p>
                </Button>
                <img src={trespuntos} className="cursor-pointer w-3 rotate-90" />
            </div>
        </div>
    )
}

const Hablar = (props: Props) => {

    const archivosDemo: ArchivoHablarProps[] = [
        {
            nombre: "10 minute conversation"
        },
        {
            nombre: "Polish culture"
        }
    ]

  return (
      <div className="flex flex-col gap-10 p-6 w-full overflow-y">
        <h1 className="text-2xl font-bold">Hablar</h1>
        <Button variant={"klDefault"}>
            <div className="w-4"><img src={masIcon} /></div><p>Generar</p>
        </Button>
        <div className='flex flex-col gap-4'>
            {
                archivosDemo.map((archivo) => <ArchivoHablar nombre={archivo.nombre}/>)
            }
        </div>
      </div>
    );
}

export default Hablar