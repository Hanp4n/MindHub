import React from 'react'
import micIcon from '../../icons/micNegro.svg'
import { Button } from '../../components/ui/button';
import openIcon from '../../icons/open.svg'
import { ChartAreaDefault } from '../../components/ui/chart-area-default';
type Props = {}

type TareaPendienteProps = {
    img: string;
    bgColor: string;
    nombre: string;
    fecha: string;
    hora: string;
    changeClick: () => void
}

type chartRegistry = {
  dia: string;
  tiempo: number
}
const chartDataDemo:chartRegistry[] = [
  { dia: "1", tiempo: 1.4 },
  { dia: "3", tiempo: 5 },
  { dia: "4", tiempo: 1 },
  { dia: "5", tiempo: 4 },
  { dia: "8", tiempo: 1 },
  { dia: "13", tiempo: 4 },
]

const TareaPendiente = ({img, bgColor, nombre, fecha, hora, changeClick}: TareaPendienteProps) => {
    return (
        <div className='flex justify-between'>
            <div className='flex gap-4 w-full'>
                <div className='flex items-center justify-center
                aspect-square h-full rounded-md'
                style={{backgroundColor: bgColor}}>
                    <img className='w-4' src={img}/>
                </div>
                <div className='flex flex-col gap-1'>
                    <p>{nombre}</p>
                    <p className='text-[var(--mh-gray)]'>{fecha} - {hora}</p>
                </div>
            </div>
            <Button onClick={changeClick} variant={"bordered"}>
                <img src={openIcon}/>
                <p>Abrir</p>
            </Button>
        </div>
    );
}

const Inicio = (props: Props) => {

    const TareasPendientesDemo: TareaPendienteProps[] = [
        {
            img: micIcon,
            bgColor: "var(--mh-dark-red)",
            nombre: "Speaking About Social Media",
            fecha: "5 nov 2025",
            hora: "23:59",
            changeClick: () => {}
        }
    ];
  return (
    <div className="flex flex-col gap-10 p-6 w-full overflow-y">
      <h1 className="text-2xl font-bold">Inicio</h1>
      <div className='w-full border border-gray p-5 rounded-xl flex flex-col gap-5'>
        <h2 className='text-lg'>Línea de tiempo</h2>
        <div>
            {TareasPendientesDemo.map(tareaPendiente => 
            <TareaPendiente 
                img={tareaPendiente.img}
                bgColor={tareaPendiente.bgColor}
                nombre={tareaPendiente.nombre}
                fecha={tareaPendiente.fecha}
                hora={tareaPendiente.hora}
                changeClick={tareaPendiente.changeClick}
            />)}
        </div>
      </div>
      <ChartAreaDefault fillColor="var(--mh-mid-dark-red)" strokeColor="var(--mh-dark-red)" title="Tiempo de uso" chartData={chartDataDemo} chartKeyName="dia" chartValueName="tiempo"/>
    </div>
  );
}

export default Inicio