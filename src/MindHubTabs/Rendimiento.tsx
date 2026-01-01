import React from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   SelectItem,
//   DropdownMenuTrigger,
// } from "../components/ui/dropdown-menu";
import generarInformeIcon from "../icons/generar.svg";
import flechaAsc from "../icons/flechaAsc.svg";
import flechaDesc from "../icons/flechaDesc.svg";
import { ChartAreaDefault } from "../components/ui/chart-area-default";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Button } from "../components/ui/button";


type RendimientoCardProps = {
  titulo: string,
  valor: number,
  porcentaje: number,
  ascendente: boolean,
  observaciones: string
}

const RendimientoCard = ({ titulo, valor, porcentaje, ascendente, observaciones }: RendimientoCardProps) => {
  return (
    <div className="flex flex-col gap-2 border border-[var(--mh-light-gray)] w-fit p-4 rounded-xl shadow-xl">
      <div className="flex items-center gap-3">
        <p className="font-bold">{titulo}</p>
        {
          ascendente ?
            <div className="flex gap-2 border w-fit p-1 px-3 rounded-2xl text-xs"><img src={flechaAsc} /> <p>+{porcentaje}%</p></div> :
            <div className="flex gap-2 border w-fit p-1 px-3 rounded-2xl text-xs"><img src={flechaDesc} /> <p>-{porcentaje}%</p></div>
        }
      </div>
      <p className="text-2xl font-bold">{valor}</p>
      <p className="text-[var(--mh-gray)]">{observaciones}</p>
    </div>
  );
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

const Rendimiento = () => {
  return (
    <div className="flex flex-col gap-10 p-6 w-full
    overflow-y">
      <h1 className="text-2xl font-bold">Rendimiento</h1>
      <div className="flex flex-wrap h-fit justify-between max-w-[800px]">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="App" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="korolang">KoroLang</SelectItem>
            <SelectItem value="korocode">KoroCode</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Mes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="enero">Enero</SelectItem>
            <SelectItem value="febrero">Febrero</SelectItem>
            <SelectItem value="marzo">Marzo</SelectItem>
            <SelectItem value="abril">Abril</SelectItem>
            <SelectItem value="mayo">Mayo</SelectItem>
            <SelectItem value="junio">Junio</SelectItem>
            <SelectItem value="julio">Julio</SelectItem>
            <SelectItem value="agosto">Agosto</SelectItem>
            <SelectItem value="septiembre">Septiembre</SelectItem>
            <SelectItem value="octubre">Octubre</SelectItem>
            <SelectItem value="noviembre">Noviembre</SelectItem>
            <SelectItem value="diciembre">Diciembre</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Año" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
          </SelectContent>
        </Select>

        <Button className="shadow-lg bg-[var(--mh-mid-light-turquoise)] flex items-center justify-center gap-3 px-3 rounded-sm"><div className="w-4"><img src={generarInformeIcon} /></div><p>Generar</p></Button>
      </div>
      <div className="bg-[var(--mh-light-gray)] h-[1px]"></div>
      <p className="text-xl font-bold">KoroLang, Noviembre de 2025</p>
      <div className="flex flex-wrap gap-4">
        <RendimientoCard valor={17} titulo="Tareas realizadas" porcentaje={20} ascendente={true} observaciones="20% más que el mes pasado" />
        <RendimientoCard valor={2.3} titulo="Duración mex de sesión" porcentaje={10} ascendente={false} observaciones="10% menos que el mes pasado" />
        <RendimientoCard valor={7} titulo="Tareas vencidas" porcentaje={5} ascendente={false} observaciones="5% menos que el mes pasado" />
      </div>
      <div>
        <ChartAreaDefault fillColor="var(--mh-mid-light-turquoise)" strokeColor="var(--mh-mid-dark-turquoise)" title="Tiempo de uso" chartData={chartDataDemo} chartKeyName="dia" chartValueName="tiempo"/>
      </div>
    </div>
  );
}

export default Rendimiento;

