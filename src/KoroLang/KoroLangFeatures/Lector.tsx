import { Button } from '../../components/ui/button'
import React from 'react'

type LectorProps = {
    src: string,
    changeActiva: (activa: boolean) => void
}

const Lector = ({src, changeActiva}: LectorProps) => {
  return (
    <div className='border bg-[var(--mh-gray)]
        fixed inset-0 flex flex-col gap-5 p-5 items-start justify-center z-99 h-full w-full'>
        <Button onClick={() => changeActiva(false)} variant={'white'}>
            Volver
        </Button>
        <div className='w-full h-full rounded-2xl border-2 border-[var(--mh-dark-gray)] overflow-hidden'>
            <iframe src={src} className='w-full h-full'/>
        </div>
    </div>
  )
}

export default Lector