import { Textarea } from '../../components/ui/textarea'
import { Switch } from '../../components/ui/switch'
import React from 'react'

type Props = {}

const Profesor = (props: Props) => {
  return (
    <div className='flex flex-col gap-6 p-6 w-90'>
      <h1 className='text-xl font-bold'>Profesor</h1>
      <div className='flex flex-col gap-5'>
        
        <div className='flex items-center justify-between'>
          <p>Sistema estricto</p>
          <Switch className='bg-[var(--mh-dark-red)]'/>
        </div>
        <div className='flex flex-col'>
            <p>Instrucciones iniciales</p>
            <Textarea/>
        </div>
      </div>
    </div>
  )
}

export default Profesor