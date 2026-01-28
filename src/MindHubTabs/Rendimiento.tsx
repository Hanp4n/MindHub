import React, { useEffect, useState } from "react";
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
import { TooltipPref } from "../components/ui/tooltipPref";

import ReportGenerator from '../Reportes/ReportGenerator';
import PDFViewer from '../Reportes/PDFViewer';


export type TiempoUsoData = {
  dia: string
  actividad: string;
  cantidad: number;
}

export type TiempoUsoLeerEscribirHablar = {
  dia: string
  leer: number
  escribir: number
  hablar: number
}
export type TiempoUsoMedioLeerEscribirHablar = {
  leer: number
  escribir: number
  hablar: number
}

export type TareaData = {
  nombre: string
  tipo: string;
  fecha_entrega: string;
  completada: boolean;
}

export type TipoTareaData = {
  speaking: number
  writing: number
}


const Rendimiento = () => {
  const [app, setApp] = useState("korolang");
  const [month, setMonth] = useState("1");
  const [year, setYear] = useState("2026");

  const [tiempoUso, setTiempoUso] = useState<TiempoUsoLeerEscribirHablar[]>([]);
  const [tiempoUsoMedio, setTiempoUsoMedio] = useState<TiempoUsoMedioLeerEscribirHablar>({} as TiempoUsoLeerEscribirHablar);
  const [tareas, setTareas] = useState<TareaData[]>([])
  const [tipoTareas, setTipoTareas] = useState({} as TipoTareaData);

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isReporteGenerado, setIsReporteGenerado] = useState(false);

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
      .select('actividad, cantidad, fecha')
      .eq('id_app', 1)
      .gte('fecha', startDate)
      .lte('fecha', endDate);

    if (error) {
      console.error('Error:', error);
      return null;
    } else {
      console.log('Datos:', data);
      const registros: TiempoUsoData[] = [];

      data.map(item => {
        registros.push({
          dia: item.fecha,
          actividad: item.actividad,
          cantidad: item.cantidad
        })
      })

      return registros;
    }
  }

  const listaTareas = async () => {
    // const { data: { session } } = await supabase.auth.getSession();
    // console.log("User ID:", session?.user.id);

    const nextMonth = (Number(month) + 1).toString().padStart(2, '0');

    const startDate = `${year}-${month.padStart(2, '0')}-01`;
    const endDate = `${year}-${nextMonth}-01`;

    // console.log("Start Date:", startDate);
    // console.log("End Date:", endDate);

    const { data, error } = await supabase
      .schema('mindhub')
      .from('tarea')
      .select('nombre, tipo, fecha_entrega, completada')
      .eq('id_app', 1)
      .gte('fecha_entrega', startDate)
      .lte('fecha_entrega', endDate);

    if (error) {
      console.error('Error:', error);
      return null;
    } else {
      console.log('Datos:', data);
      return data as TareaData[];
    }
  }

  const generarInforme = async (url: string) => {

    setIsReporteGenerado(true);
    setPdfUrl(url);
  };

  useEffect(() => {

    const prepararInforme = async () => {
      const tiempoUsoData = await tiempoDeUsoApp();
      const tareasData = await listaTareas();

      if (tiempoUsoData == null || tareasData == null) {
        console.error('No se pudieron obtener todos los datos');
        return;
      }

      const tiempoUsoLeerEscribirHablar: TiempoUsoLeerEscribirHablar[] = [];

      tiempoUsoData.forEach(item => {
        tiempoUsoLeerEscribirHablar.push({
          dia: item.dia,
          leer: item.actividad === 'leer' ? item.cantidad : 0,
          escribir: item.actividad === 'escribir' ? item.cantidad : 0,
          hablar: item.actividad === 'hablar' ? item.cantidad : 0
        });
      });

      let sumatorioLeer = 0;
      let sumatorioEscribir = 0;
      let sumatorioHablar = 0;

      tiempoUsoData.filter((tiempo: TiempoUsoData) => tiempo.actividad === "leer").forEach(item => sumatorioLeer += item.cantidad);
      tiempoUsoData.filter((tiempo: TiempoUsoData) => tiempo.actividad === "escribir").forEach(item => sumatorioEscribir += item.cantidad);
      tiempoUsoData.filter((tiempo: TiempoUsoData) => tiempo.actividad === "hablar").forEach(item => sumatorioHablar += item.cantidad);

      const tiempoUsoMedioLeerEscribirHablar: TiempoUsoMedioLeerEscribirHablar = {
        leer: sumatorioLeer / tiempoUsoData.length,
        escribir: sumatorioEscribir / tiempoUsoData.length,
        hablar: sumatorioHablar / tiempoUsoData.length
      };

      const cuentaTipoTarea: TipoTareaData = {
        speaking: tareasData.filter(tarea => tarea.tipo === "speaking").length,
        writing: tareasData.filter(tarea => tarea.tipo === "writing").length
      }

      setTiempoUso(tiempoUsoLeerEscribirHablar);
      setTiempoUsoMedio(tiempoUsoMedioLeerEscribirHablar);
      setTareas(tareasData);
      setTipoTareas(cuentaTipoTarea);
    }
    
    prepararInforme();

  }, [month, app, year]);


  return (
    <div className="flex flex-col gap-10 p-6 w-full
    overflow-y">
      <h1 className="text-2xl font-bold">Rendimiento</h1>
      <div className="flex flex-wrap h-fit justify-between max-w-[800px]">

        <TooltipPref contenedor={
          <div>
            <Select value={app} onValueChange={setApp}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="App" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="korolang">KoroLang</SelectItem>
                <SelectItem value="korocode">KoroCode</SelectItem>
              </SelectContent>
            </Select>
          </div>
        } contenido={<p>Aplicación de origen</p>} />
        <TooltipPref contenedor={
          <div>
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
          </div>

        } contenido={<p>Mes seleccionado</p>} />
        <TooltipPref contenedor={
          <div>
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
          </div>
        } contenido={<p>Año seleccionado</p>} />


        {/* <Button onClick={generarInforme} className="shadow-lg bg-[var(--mh-mid-light-turquoise)] flex items-center justify-center gap-3 px-3 rounded-sm"><div className="w-4"><img src={generarInformeIcon} /></div><p>Generar</p></Button> */}
        <ReportGenerator
          mes={month}
          anio={year}
          tareas={tareas}
          tiempoUso={tiempoUso}
          tiempoUsoMedio={tiempoUsoMedio}
          tipoTareas={tipoTareas}
          onGenerated={(url) => generarInforme(url)}
        />

      </div>


      {
        isReporteGenerado
        &&
        <>
          <h2 style={{ marginTop: "20px" }}>Vista previa del PDF</h2>
          <PDFViewer pdfUrl={pdfUrl} />
        </>
      }
    </div>
  );
}

export default Rendimiento;

