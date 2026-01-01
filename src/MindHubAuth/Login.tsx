import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../icons/Group 11.svg';
import { supabase } from '../supabaseClient'; 
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

function Login() {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(correoElectronico)) {
      setError("Introduce un correo válido");
      return;
    }
    if (!contrasena) {
      setError("Introduce la contraseña");
      return;
    }
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email: correoElectronico,
      password: contrasena,
    });

    if (error) {
      setError(error.message);
    } else {
      window.ipcRenderer.send('abrir-mindHub');
      window.close();
    }
  }

  const handleRegister = () => {
    navigate('/register');
  };


  return (
    <div className='w-screen h-screen flex items-center justify-center flex-col gap-5'>
      <div className='flex flex-row items-center gap-2'>
        <img src={Logo} className='w-15'/>
        <h1 className='text-4xl'>MindHub</h1>
      </div>
      <form onSubmit={handleLogin} className='flex flex-col gap-5 rounded-2xl shadow-xl p-10'>
        <div className='login-fields flex flex-col gap-5 w-full'>
          <label>
            <p>Correo electrónico</p>
            <Input
              type="text"
              value={correoElectronico}
              onChange={(e) => setCorreoElectronico(e.target.value)}
              className='p-1 px-2 border w-full border-[var(--mh-gray)] rounded-md'
            />
          </label>
          <label>
            <p>Contraseña</p>
            <Input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className='p-1 px-2 border w-full border-[var(--mh-gray)] rounded-md'
            />
          </label>
        </div>
        {error && <p className='text-[var(--mh-red)]'>{error}</p>}
        <p className='text-[var(--mh-gray)]'>¿Olvidaste la contraseña?</p>
        <div className='flex gap-20'>
          <label className='flex items-center gap-2'>
            <input type="checkbox" />
            <p className='text-[var(--mh-gray)]'>Recuérdame</p>
          </label>
          <span className='flex gap-5'>
            <Button variant="white" type='button' onClick={handleRegister} className='p-2 px-5'>Registrarse</Button>
            <Button variant="default" type='submit' className='p-2 px-5 bg-[var(--mh-mid-light-turquoise)] rounded-lg text-black'>Acceder</Button>
          </span>
        </div>
      </form>
    </div>
  )
}

export default Login;