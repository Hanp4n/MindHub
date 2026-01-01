import React from "react";
import { Switch } from "../components/ui/switch";
import folderIcon from "../icons/carpeta.svg"; // Ajusta la ruta según tu proyecto

type FilePathProps = {
    nombre: string;
    path: string;
}

const FilePath = ({ nombre, path }: FilePathProps) => {

    return (
        <div className="flex flex-col gap-2">
            <p className="font-medium">{nombre}</p>
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={path}
                    className="
                    w-full border border-gray-300 rounded-md px-3 py-1.5 
                    focus:outline-none focus:ring-1 focus:ring-gray-400
                    "
                />
                <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-100">
                    <img src={folderIcon} className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

const Descargas = () => {
    return (
        <div className="flex flex-col gap-6 p-6 w-[420px]">
            <h1 className="text-xl font-bold">Descargas</h1>
            <FilePath nombre="Asignaturas instaladas" path="T:/Koromind"/>
            <FilePath nombre="Archivos" path="T:/Koromind/archivos"/>
            <div className="flex items-center justify-between mt-2">
                <p className="font-medium">Actualizaciones automáticas</p>
                <Switch />
            </div>

        </div>
    );
};

export default Descargas;
