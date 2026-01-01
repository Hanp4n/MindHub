import { Switch } from '../components/ui/switch'
import React from 'react'

type Props = {}

const Notificaciones = () => {
    return (
        <div className='flex flex-col gap-6 p-6 w-90'>
            <h1 className='text-xl font-bold'>Notificaciones</h1>
            <div className='flex flex-col gap-5'>
                <div className='flex items-center justify-between'>
                    <p>Mostrar notificaciones</p>
                    <Switch />
                </div>
                <div className='flex items-center justify-between'>
                    <p>Reproducir sonido</p>
                    <Switch />
                </div>
            </div>
        </div>
    )
}

export default Notificaciones