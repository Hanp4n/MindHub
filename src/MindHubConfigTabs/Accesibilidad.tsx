import { Session } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Input } from '../components/ui/input'
import { Switch } from '../components/ui/switch'
import { useTheme } from '../theme-provider'


const Accesibilidad = () => {
  const [tema, setTema] = useState("claro");
  const { setTheme } = useTheme()
  useEffect(() => {
    switch(tema){
      case "sistema":
        setTheme('system');
        break;
      case "claro":
        setTheme('light');
        break;
      case "oscuro":
        setTheme('dark');
        break;
    }
  }, [tema])
  
  
  return (
    <div className='flex flex-col gap-6 p-6 w-90'>
      <h1 className='text-xl font-bold'>Accesibilidad</h1>
      <div className='flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
          <p>Tema</p>
          <Select value={tema} onValueChange={setTema}>
            <SelectTrigger className="w-fit z-99">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent className='z-99'>
              <SelectItem value="sistema">Sistema</SelectItem>
              <SelectItem value="claro">Claro</SelectItem>
              <SelectItem value="oscuro">Oscuro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center justify-between'>
          <p>Tamaño de texto</p>
          <Input
              type="number"
              className='w-20'
              defaultValue={16}
            />
        </div>
        <div className='flex items-center justify-between'>
          <p>Reducir movimientos</p>
          <Switch/>
        </div>
      </div>
    </div>
  )
}

export default Accesibilidad