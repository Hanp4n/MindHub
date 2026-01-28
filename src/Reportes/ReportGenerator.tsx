import { pdf } from "@react-pdf/renderer";
import InformeRendimiento from "./InformeRendimiento";
import { TareaData, TiempoUsoLeerEscribirHablar, TiempoUsoMedioLeerEscribirHablar } from "../MindHubTabs/Rendimiento";
import { Button } from "../components/ui/button";

import generarInformeIcon from "../icons/generar.svg";

type Props = {
  mes: string
  anio: string
  tareas: TareaData[]
  tiempoUso: TiempoUsoLeerEscribirHablar[]
  tiempoUsoMedio: TiempoUsoMedioLeerEscribirHablar
  onGenerated: (pdfUrl: string) => void;
};

export default function ReportGenerator({
  mes, anio, tareas, tiempoUso, tiempoUsoMedio, onGenerated
}: Props) {

  async function generarPDF() {
    const doc = <InformeRendimiento mes={mes} anio={anio} tareas={tareas} tiempoUso={tiempoUso} tiempoUsoMedio={tiempoUsoMedio} />;

    const blob = await pdf(doc).toBlob();

    const url = URL.createObjectURL(blob);

    return url;
  }

  return (
    <Button onClick={async () => {
      const url = await generarPDF();
      if (url === undefined) {
        return;
      }
      onGenerated(url);
    }}
    
    className="shadow-lg bg-[var(--mh-mid-light-turquoise)] flex items-center justify-center gap-3 px-3 rounded-sm"
    >
      <div className="w-4"><img src={generarInformeIcon} /></div><p>Generar</p>
    </Button>
  );
}