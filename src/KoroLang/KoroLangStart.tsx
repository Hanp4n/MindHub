import React, { useContext } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import BorderedButton from '@/BorderedButton'
import { Button } from '../components/ui/button'
import { useAppContext} from '../AppContext'


type KoroLangStartProps = {
  onClose: () => void;
  changeIdioma: (value: string) => void;
}

const KoroLangStart = ({onClose, changeIdioma}: KoroLangStartProps) => {
  
  return (
    <>
      <div className='border bg-background
      fixed inset-0 flex flex-col gap-5 items-center justify-center z-99 h-full w-full'>
        <div className='border border-[var(--mh-light-gray)] rounded-lg p-10 flex flex-col gap-6'>
          <h1 className='text-xl font-bold text-center'>¡Bienvenido a KoroLang!</h1>
          <div className='flex justify-between items-center'>
              <p>Idioma a estudiar</p>
              <Select onValueChange={(value) => changeIdioma(value)}>
                  <SelectTrigger className="w-fit z-99">
                      <SelectValue placeholder="Idioma" />
                  </SelectTrigger>
                  <SelectContent className='z-99'>
                      <SelectItem value="ingles">Inglés</SelectItem>
                      <SelectItem value="aleman">Alemán</SelectItem>
                      <SelectItem value="frances">Francés</SelectItem>
                  </SelectContent>
              </Select>
          </div>
          <div className='flex justify-end'>
            <Button onClick={onClose} variant={"klDefault"}>Acceder</Button>
          </div>

        </div>
      </div>
    </>
  )
}

export default KoroLangStart