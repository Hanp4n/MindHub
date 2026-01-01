import React, { useState } from "react";
import { Checkbox } from "../components/ui/checkbox";
import trash from "../icons/papelera.svg";

type Props = {}

type AsignaturaProps = {
    bgColor: string;
    nombre: string;
    tamano: string;
}

const Asignatura = ({bgColor, nombre, tamano}: AsignaturaProps) => {
    const [checked, setChecked] = useState(false);
    return (
        <label className="cursor-pointer flex items-center justify-between p-2 hover:bg-[var(--mh-light-gray)]/20" 
        style={{backgroundColor: checked ? "var(--mh-light-gray)" : "white"}}>
            <div className="flex items-center gap-3">
                <span
                    className="w-6 h-6 rounded-md"
                    style={{ background: bgColor }}
                ></span>

                <div className="flex flex-col leading-none">
                    <p className="font-medium">{nombre}</p>
                    <span className="text-sm text-gray-500">{tamano}</span>
                </div>
            </div>
            <input type="checkbox" onClick={() => setChecked(!checked)}/>
        </label>
    );
}

const Almacenamiento = () => {

    // Datos de ejemplo extraídos de tu imagen
    const asignaturas = [
        {
            nombre: "KoroLang",
            color: "var(--mh-dark-red)",
            size: "6,9GB",
        },
        {
            nombre: "KoroMath",
            color: "var(--mh-light-turquoise)",
            size: "11,4GB",
        },
        {
            nombre: "KoroCode",
            color: "var(--mh-mid-dark-green)",
            size: "10,4GB",
        },
    ];

    return (
        <div className="flex flex-col gap-6 p-6 w-[460px]">
            <h1 className="text-xl font-bold">Almacenamiento</h1>

            <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-600">T:\Koromind</p>
                <div className="w-full h-3 flex bg-[var(--mh-light-gray)] rounded-full overflow-hidden">
                    <div className="w-14 h-full bg-[var(--mh-dark-turquoise)]"></div> 
                    <div className="w-41 h-full bg-[var(--mh-mid-light-turquoise)]"></div> 
                </div>
            </div>

            <div className="text-sm flex flex-col gap-1 ">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full inline-block bg-[var(--mh-dark-turquoise)]"></span>
                    <p><span className="font-bold">Asignaturas</span> 28,7GB</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full inline-block bg-[var(--mh-mid-light-turquoise)]"></span>
                    <p><span className="font-bold">Archivos externos</span> 50,8GB</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full inline-block bg-[var(--mh-light-gray)]"></span>
                    <p><span className="font-bold">Espacio libre</span> 201,09GB</p>
                </div>
            </div>

            <div className="w-full h-[1px] bg-gray-300"></div>

            <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Asignaturas</h2>
                <div className="flex justify-end cursor-pointer mt-2">
                    <img src={trash} className="w-5 h-5 opacity-75 hover:opacity-100 transition" />
                </div>
            </div>
            <div className="flex flex-col">
                {asignaturas.map((a) => (
                    <Asignatura bgColor={a.color} nombre={a.nombre} tamano={a.size}/>
                ))}
            </div>



        </div>
    );
};

export default Almacenamiento;
