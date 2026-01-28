import { Button } from '../components/ui/button';
import React from 'react'

type DialogInfoProps = {
  onClose: Function,
  mensaje: string,
  titulo: string,
}

const DialogInfo = ({ mensaje, titulo, onClose }: DialogInfoProps) => (
  <div className='fixed inset-0 bg-black/25 flex items-center justify-center z-9999'>
    <div className='bg-background p-6 rounded-2xl shadow-2xl max-w-sm mx-4 flex flex-col gap-4'>
      <h2 className='text-xl font-semibold'>{titulo}</h2>
      <p>{mensaje}</p>
      <div className='flex justify-end'>
        <Button
          variant={"white"}
          onClick={() => onClose()}
        >
          Cerrar
        </Button>
      </div>
    </div>
  </div>
);

export default DialogInfo