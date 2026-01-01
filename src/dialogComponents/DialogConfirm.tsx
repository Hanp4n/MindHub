import { Button } from '../components/ui/button';
import React from 'react'

type DialogConfirmProps = {
  onYes: Function,
  onNo: Function,
  mensaje?: string,
  titulo: string,
  buttonColor?: string
}

const DialogConfirm = ({ mensaje, titulo, onYes, onNo, buttonColor }: DialogConfirmProps) => {

  return (
    <div className='fixed inset-0 bg-black/25 flex items-center justify-center z-9999'>
      <div className='bg-white p-6 rounded-2xl shadow-2xl max-w-sm mx-4 flex flex-col gap-6 w-80'>
        <h2 className='text-xl text-center font-semibold'>{titulo}</h2>
        {mensaje && <p>{mensaje}</p>}
        <div className='flex justify-between'>
          <Button
            variant={"white"}
            onClick={() => onNo()}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => onYes()}
            style={{backgroundColor: buttonColor ?? "var(--mh-mid-light-turquoise)"}}
          >
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DialogConfirm