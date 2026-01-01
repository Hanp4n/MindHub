import { Button } from '../components/ui/button';
import React, { useEffect, useState } from 'react'

type ProgressProps = {
  titulo: string;
  onCompleted: () => void;
  progressBarColor?: string;
  changeActiva: (isActiva: boolean) => void;
}

const DialogProgress = ({ titulo, onCompleted, changeActiva, progressBarColor }: ProgressProps) => {
  const [progressValue, setProgressValue] = useState(0);
  
  useEffect(() => {
    const inter = setInterval(() => {
      setProgressValue(prev => {
        if (prev >= 100) {
          clearInterval(inter);
          onCompleted();
          changeActiva(false);
          return 0;
        }
        return prev + 10;
      });
    }, 700);

    return () => clearInterval(inter);

  }, []);

  return (
    <div className='fixed inset-0 bg-black/25 flex items-center justify-center z-99'>
      <div className='bg-white p-6 rounded-2xl shadow-2xl max-w-sm mx-4 flex flex-col gap-4'>
        <h2 className='text-xl font-semibold'>{titulo}</h2>
        <div className="w-full h-3 flex bg-[var(--mh-light-gray)] rounded-full overflow-hidden">
          <div className="h-full"
            style={{
              width: `${progressValue}%`,
              backgroundColor: progressBarColor ?? "var(--mh-mid-light-turquoise)"
            }}></div>
        </div>
        <div className='flex justify-end'>
          <Button variant={"white"}
            onClick={() => {
              changeActiva(false)
            }}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DialogProgress