// src/components/tareas/ArchivoTarea.tsx
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import escribir from "../../icons/nuevaTarea.svg";
import micro from "../../icons/micNegro.svg";
import abrirIcon from "../../icons/open.svg"
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../supabaseClient'
type TipoTarea = 'hablar' | 'escribir';

type ArchivoTareaProps = {
    nombre: string;
    tipo: TipoTarea;
}

const ArchivoTarea = ({ nombre, tipo }: ArchivoTareaProps) => {
    const iconoSvg = tipo === 'escribir' ? escribir : micro;

    return (
        <div className='flex w-full justify-between items-center py-3'>
            <div className='flex gap-4 items-center'>
                <div className='flex items-center justify-center 
                aspect-square h-12 rounded-md bg-[var(--mh-light-gray)] w-12'>
                    <img
                        className={tipo === 'escribir' ? 'w-5' : 'w-4'}
                        src={iconoSvg}
                        alt={tipo}
                    />
                </div>
                <p className='text-lg'>{nombre}</p>
            </div>

            <div className='flex items-center'>
                <Button
                    variant={"bordered"}
                >
                    <p>Abrir</p>
                    <img src={abrirIcon} />
                </Button>
            </div>
        </div>
    );
}
const tareasDemo: ArchivoTareaProps[] = [
    {
        nombre: "Social Media Essay",
        tipo: "escribir"
    },
    {
        nombre: "About Polish Culture",
        tipo: "hablar"
    }

]

const Tareas = () => {
    const [tareas, setTareas] = useState<ArchivoTareaProps[]>([]);
    const [session, setSession] = useState<Session | null>(null);
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
    }, []);

    useEffect(() => {
        if (!session) return;

        async function getTareasFromSupabase() {
            const { data, error } = await supabase
                .from('tareas')
                .select('nombre, tipo')
                .eq('email', session?.user.email);

            if (error) {
                console.error('Error loading tasks:', error);
                return;
            }

            setTareas(data as ArchivoTareaProps[]);
        }

        getTareasFromSupabase();
    }, [session]);

    return (
        <div className="flex flex-col gap-10 p-6 w-full overflow-y">
            <h1 className="text-2xl font-bold">Tareas</h1>

            <div className='flex flex-col gap-4'>
                {
                    tareas.map((archivo) => <ArchivoTarea nombre={archivo.nombre} tipo={archivo.tipo} />)
                }
            </div>
        </div>
    );
}

export default Tareas;