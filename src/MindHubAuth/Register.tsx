import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../icons/Group 11.svg';
import { supabase } from '../supabaseClient'; 
import DialogInfo from '../dialogComponents/DialogInfo';
import { Button } from '../components/ui/button';
import ayudaIcon from "../icons/ayudaIcon.svg"


function Register() {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [contrasena2, setContrasena2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async () => {
    if (!validateEmail(correoElectronico)) {
      setError("Introduce un correo válido");
      return;
    }
    if (!contrasena || !contrasena2) {
      setError("Introduce ambas contraseñas");
      return;
    }
    if (contrasena !== contrasena2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setError("");

    const { error: supabaseError } = await supabase.auth.signUp({
      email: correoElectronico,
      password: contrasena,
    });

    if (supabaseError) {
      setError(supabaseError.message);
      return;
    }

    setSuccess(true);
  }

  const handleSuccess = () => {
    setSuccess(false);
    navigate("/");
  }


  return (
    <div className='w-screen h-screen flex items-center justify-center flex-col gap-5'>
      <div className='flex flex-row items-center gap-2'>
        <img src={Logo} className='w-15'/>
        <h1 className='text-4xl'>MindHub</h1>
      </div>
      <div className='flex flex-col gap-5 rounded-2xl shadow-xl p-10'>
        <div className='login-fields flex flex-col gap-5 w-full'>
          <label>
            <p>Correo electrónico</p>
            <input
              type="text"
              value={correoElectronico}
              onChange={(e) => setCorreoElectronico(e.target.value)}
              className='p-1 px-2 border w-full border-[var(--mh-gray)] rounded-md'
            />
          </label>
          <div className='flex gap-5'>
            <label>
              <p>Contraseña</p>
              <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className='p-1 px-2 border w-full border-[var(--mh-gray)] rounded-md'
              />
            </label>
            <label>
              <p>Repetir contraseña</p>
              <input
                type="password"
                value={contrasena2}
                onChange={(e) => setContrasena2(e.target.value)}
                className='p-1 px-2 border w-full border-[var(--mh-gray)] rounded-md'
              />
            </label>
          </div>
        </div>
        {error && <p className='text-[var(--mh-red)]'>{error}</p>}
        {success && (
          <DialogInfo titulo='Registro completado' mensaje='Usuario creado correctamente' onClose={handleSuccess}/>
        )}
        <div className='flex justify-between gap-5 w-full'>
          <Button
              variant="white"
              onClick={() => navigate("/")}
              className='p-2 px-5 bg-white rounded-lg text-black'
            >
            Volver
          </Button>
          <Button variant="default"
            onClick={handleRegister}
            className='p-2 px-5 bg-[var(--mh-mid-light-turquoise)] rounded-lg text-black'
          >
            Registrarse
          </Button>
        </div>
        <div onClick={() => window.ipcRenderer.send("abrir-ayudamh")} className="flex gap-3 cursor-pointer">
          <div className="w-6 opacity-50">
            <img src={ayudaIcon} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
