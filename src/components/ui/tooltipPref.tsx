import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./tooltip"

type TooltipProps = {
    contenedor: any;
    contenido: any;
}

export function TooltipPref({contenedor, contenido}: TooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {contenedor}
      </TooltipTrigger>
      <TooltipContent>
        {contenido}
      </TooltipContent>
    </Tooltip>
  )
}