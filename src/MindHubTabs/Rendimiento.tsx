import React, { useState } from "react";
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
import { supabase } from "../supabaseClient";

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

const chartDataDemo: chartRegistry[] = [
  { dia: "1", tiempo: 1.4 },
  { dia: "3", tiempo: 5 },
  { dia: "4", tiempo: 1 },
  { dia: "5", tiempo: 4 },
  { dia: "8", tiempo: 1 },
  { dia: "13", tiempo: 4 },
]

const Rendimiento = () => {
  const [app, setApp] = useState("korolang");
  const [month, setMonth] = useState("1");
  const [year, setYear] = useState("2026");

  const tiempoDeUsoApp = async () => {
    // const { data: { session } } = await supabase.auth.getSession();
    // console.log("User ID:", session?.user.id);

    const nextMonth = (Number(month) + 1).toString().padStart(2, '0');

    const startDate = `${year}-${month.padStart(2, '0')}-01`;
    const endDate = `${year}-${nextMonth}-01`;

    // console.log("Start Date:", startDate);
    // console.log("End Date:", endDate);

    const { data, error } = await supabase
      .schema('mindhub')
      .from('tiempo')
      .select('cantidad')
      .eq('id_app', 1)
      .gte('fecha', startDate)
      .lte('fecha', endDate);

    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Datos:', data);
      return data;
    }
  }

  const generarInforme = async () => {
    const tiempoUso = await tiempoDeUsoApp();
    //tareas enviadas este mes
    const tareasRealizadas = 15; // Placeholder
    const TareasVencidas = 3; // Placeholder
  };

  return (
    <div className="flex flex-col gap-10 p-6 w-full
    overflow-y">
      <h1 className="text-2xl font-bold">Rendimiento</h1>
      <div className="flex flex-wrap h-fit justify-between max-w-[800px]">
        <Select value={app} onValueChange={setApp}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="App" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="korolang">KoroLang</SelectItem>
            <SelectItem value="korocode">KoroCode</SelectItem>
          </SelectContent>
        </Select>
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Mes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Enero</SelectItem>
            <SelectItem value="2">Febrero</SelectItem>
            <SelectItem value="3">Marzo</SelectItem>
            <SelectItem value="4">Abril</SelectItem>
            <SelectItem value="5">Mayo</SelectItem>
            <SelectItem value="6">Junio</SelectItem>
            <SelectItem value="7">Julio</SelectItem>
            <SelectItem value="8">Agosto</SelectItem>
            <SelectItem value="9">Septiembre</SelectItem>
            <SelectItem value="10">Octubre</SelectItem>
            <SelectItem value="11">Noviembre</SelectItem>
            <SelectItem value="12">Diciembre</SelectItem>
          </SelectContent>
        </Select>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Año" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2026">2026</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={generarInforme} className="shadow-lg bg-[var(--mh-mid-light-turquoise)] flex items-center justify-center gap-3 px-3 rounded-sm"><div className="w-4"><img src={generarInformeIcon} /></div><p>Generar</p></Button>
      </div>
      <div className="bg-[var(--mh-light-gray)] h-[1px]"></div>
      <p className="text-xl font-bold">KoroLang, Noviembre de 2025</p>
      <div className="flex flex-wrap gap-4">
        <RendimientoCard valor={17} titulo="Tareas realizadas" porcentaje={20} ascendente={true} observaciones="20% más que el mes pasado" />
        <RendimientoCard valor={2.3} titulo="Duración mex de sesión" porcentaje={10} ascendente={false} observaciones="10% menos que el mes pasado" />
        <RendimientoCard valor={7} titulo="Tareas vencidas" porcentaje={5} ascendente={false} observaciones="5% menos que el mes pasado" />
      </div>
      <div>
        <ChartAreaDefault fillColor="var(--mh-mid-light-turquoise)" strokeColor="var(--mh-mid-dark-turquoise)" title="Tiempo de uso" chartData={chartDataDemo} chartKeyName="dia" chartValueName="tiempo" />
      </div>
    </div>
  );
}

export default Rendimiento;

