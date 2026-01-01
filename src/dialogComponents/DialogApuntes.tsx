import { Button } from '../components/ui/button';
import React from 'react'

type filaApunte = {
    palabra: string;
    traduccion: string;
    explicacion: string;
}

type DialogApuntesProps = {
    onClose: Function,
    apuntes: filaApunte[]
}

const DialogApuntes = ({ apuntes, onClose }: DialogApuntesProps) => (
    <div className='fixed inset-0 bg-black/25 flex items-center justify-center z-9999'>
        <div className='bg-white p-6 rounded-2xl shadow-2xl mx-4 flex flex-col gap-4'>
            <h2 className='text-xl font-semibold'>Apuntes</h2>
            <table>
                <tr className=''>
                    <th>Palabra</th>
                    <th>Traducción</th>
                    <th>Explicación</th>
                </tr>
                {
                    apuntes.map((filaApunte: filaApunte) => {
                        return (
                            <tr className=''>
                                <td className='p-3'>{filaApunte.palabra}</td>
                                <td className='p-3'>{filaApunte.traduccion}</td>
                                <td className='p-3'>{filaApunte.explicacion}</td>
                            </tr>
                        )
                    })
                }
            </table>
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

export default DialogApuntes