import React, { useEffect, useState } from 'react'
import iconoCuenta from '../icons/icono-cuenta.svg'
import BorderedButton from '../BorderedButton';
import { session } from 'electron';
import Notificaciones from './icons/notificacion.svg';
import { supabase } from '../supabaseClient';
import { Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useAppContext } from '@/AppContext';


const Cuenta = () => {
    const navigate = useNavigate();

    const [session, setSession] = useState<Session | null>(null);
    
      useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
      }, [])

    async function signOut() {
        const { error } = await supabase.auth.signOut();
        if(error){
            return;
        }else{
            window.ipcRenderer.send('abrir-login');
            window.close();
        }
    }

    return (
        <div className='flex flex-col gap-6 p-6'>
            <h1 className='text-xl font-bold'>Cuenta</h1>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                    <div className='w-10 h-10'>
                        <img src={iconoCuenta} />
                    </div>
                    <p>{session?.user.email}</p>
                </div>
                <p className='text-[var(--mh-gray)]'>Cambiar contraseña</p>
            </div>
            <Button variant="bordered" onClick={signOut }>Cerrar sesión</Button>
        </div>
    )
}

export default Cuenta