import React, { useState } from 'react'
import masIcon from "../../icons/generar.svg"
import { Button } from '../../components/ui/button';
import archivoIcon from "../../icons/archivo.svg"
import masInfoIcon from "../../icons/masInfo.svg"
import ojoIcon from "../../icons/ojoNegro.svg"
import trespuntos from "../../icons/3-puntos.svg"
import Lector from '../KoroLangFeatures/Lector';
import DialogApuntes from '../../dialogComponents/DialogApuntes';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import DialogConfirm from '../../dialogComponents/DialogConfirm';

type Props = {}

type filaApunte = {
    palabra: string;
    traduccion: string;
    explicacion: string;
}

type ArchivoLeerProps = {
    path: string;
    changeClick?: () => void;
    apuntes?: filaApunte[];
    onDelete?: () => void;
}



const ArchivoLeer = ({ path, changeClick, apuntes, onDelete }: ArchivoLeerProps) => {
    const [isOpeningApuntes, setIsOpeningApuntes] = useState(false);
    const [isOpeningEliminar, setIsOpeningEliminar] = useState(false);
    const nombre = getNombre();
    const initFilaApunte: filaApunte[] = [{
        palabra: "",
        traduccion: "",
        explicacion: ""
    }];

    function getNombre() {
        let name;
        if (path.includes("/")) {
            name = path.split("/");
        } else {
            name = path.split("\\");
        }
        return name[name.length - 1];
    }

    return (
        <div className='flex w-full justify-between'>
            {isOpeningApuntes && <DialogApuntes apuntes={apuntes ?? initFilaApunte} onClose={() => setIsOpeningApuntes(false)} />}
            {isOpeningEliminar && <DialogConfirm buttonColor='var(--mh-dark-red)' titulo={`¿Eliminar ${getNombre()}?`} onNo={() => setIsOpeningEliminar(false)} onYes={() => { onDelete && onDelete() }} />}
            <div className='flex gap-2 items-center justify-center'>
                <div className='flex items-center justify-center 
                aspect-square h-full rounded-md bg-[var(--mh-light-gray)] w-12'>
                    <img className='w-5' src={archivoIcon} />
                </div>
                <p>{nombre}</p>
            </div>
            <div className='flex gap-3 items-center'>
                <Button onClick={() => setIsOpeningApuntes(true)} className='flex' variant={"bordered"}>
                    <img src={masInfoIcon} />
                    <p>Apuntes</p>
                </Button>
                <Button onClick={() => { changeClick && changeClick(); }} className='flex' variant={"klDefault"}>
                    <img src={ojoIcon} />
                    <p>Leer</p>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <img src={trespuntos} className="cursor-pointer w-3 rotate-90" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-fit" align="start">
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => setIsOpeningEliminar(true)}>
                                Eliminar
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
const archivosDemo: ArchivoLeerProps[] = [
    {
        path: "\\public\\Complaint.pdf",
        apuntes: [
            {
                palabra: "dissatisfaction",
                traduccion: "insatisfacción",
                explicacion: "Expresión común para mostrar desacuerdo."
            }
        ]

    },
    {
        path: "\\public\\Emails.pdf"
    }
]


const Leer = (props: Props) => {
    const [isOpeningLector, setIsOpeningLector] = useState(false);
    const [archivo, setArchivo] = useState("");
    const [archivos, setArchivos] = useState<ArchivoLeerProps[]>(archivosDemo)

    function handleLectura(src: string, isActivo: boolean) {
        setIsOpeningLector(isActivo);
        setArchivo(src);
    }

    return (
        <div className="flex flex-col gap-10 p-6 w-full overflow-y">
            {isOpeningLector && <Lector src={archivo} changeActiva={() => setIsOpeningLector(false)} />}
            <h1 className="text-2xl font-bold">Leer</h1>
            <Button variant={"klDefault"}>
                <div className="w-4"><img src={masIcon} /></div><p>Generar</p>
            </Button>
            <div className='flex flex-col gap-4'>
                {
                    archivos.map((archivo) => <ArchivoLeer
                        key={archivo.path}
                        apuntes={archivo.apuntes}
                        changeClick={() => handleLectura(archivo.path, true)}
                        path={archivo.path}
                        onDelete={() => {
                            setArchivos((prev) =>
                                prev.filter((a) => a.path !== archivo.path)
                            );
                        }} />
                    )
                }
            </div>
        </div>
    );
}

export default Leer