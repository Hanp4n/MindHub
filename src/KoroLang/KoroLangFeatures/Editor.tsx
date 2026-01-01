import { Input } from '../../components/ui/input'
import React, { useState } from 'react'
import guardar from '../../icons/guardar.svg'
import { Button } from '../../components/ui/button'
import { Textarea } from '../../components/ui/textarea'
import DialogConfirm from '../../dialogComponents/DialogConfirm'

type EditorProps = {
    onClose: () => void
}

const Editor = ({onClose}:EditorProps) => {
    const [guardado, setGuardado] = useState(true);
    const [isQuitting, setIsQuitting] = useState(false);
    function handleQuit(){
        if(guardado){
            onClose();
        }else{
            setIsQuitting(true);
        }
    }
  return (
    <div className='bg-[var(--mh-dark-gray)] w-full
    fixed inset-0 flex flex-col gap-10  items-center z-99 h-full w-full'>
        {isQuitting && !guardado && <DialogConfirm buttonColor='var(--mh-dark-red)' titulo='¿Salir sin guardar?' onYes={onClose} onNo={() => setIsQuitting(false)}/>}
        <div className='flex justify-start border-b border-black p-6 w-full'>
            <div className='flex gap-5'>
                <Button onClick={handleQuit} variant={"white"}>Volver</Button>
                <Input className='w-30 text-white' placeholder='Nombre de documento...'/>
                <img src={guardar} className='cursor-pointer' onClick={() => setGuardado(true)}
                style={{opacity: guardado ? 0.4 : 1}}/>
            </div>
        </div>
        <div className='bg-white p-10 w-[50%] h-full'>
            <Textarea onChange={() => setGuardado(false)} className='w-full h-full border-0 shadow-none pointer-none:'/>
        </div>
    </div>
  )
}

export default Editor