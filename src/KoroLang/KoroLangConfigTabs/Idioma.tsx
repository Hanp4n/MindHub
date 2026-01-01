import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Switch } from '../../components/ui/switch'
import React, { useEffect, useState } from 'react'

type Props = {}

const Idioma = (props: Props) => {
    const [idioma, setIdioma] = useState("ingles");

    useEffect(() => {
      
    
    }, [])
    

  return (
    <div className='flex flex-col gap-6 p-6 w-90'>
      <h1 className='text-xl font-bold'>Idioma</h1>
      <div className='flex flex-col gap-5'>
        
        <div className='flex items-center justify-between'>
          <p>Adaptar idioma al sistema</p>
          <Switch/>
        </div>
        <div className='flex items-center justify-between'>
          <p>Idioma a estudiar</p>
          <Select value={idioma} onValueChange={(value:string) => setIdioma(value)}>
            <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Año" />
          </SelectTrigger>
          <SelectContent className='z-888'>
            <SelectItem value="ingles">Inglés</SelectItem>
            <SelectItem value="frances">Francés</SelectItem>
            <SelectItem value="aleman">Alemán</SelectItem>
          </SelectContent>
        </Select>
        </div>
        
      </div>
    </div>
  )
}

export default Idioma