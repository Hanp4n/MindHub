import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

type AppContextType = {
  session: Session | null;
  setSession: (session: Session | null) => void;
  idioma: string;
  setIdioma: (idioma: string ) => void 
};

const AppContext = createContext<AppContextType>({
  session: null,
  setSession: () => {},
  idioma: "ingles",
  setIdioma: () => {}
});

export const useAppContext = () => useContext(AppContext);

type AppProviderProps = { children: ReactNode };

export const AppProvider = ({ children }: AppProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [idioma, setIdioma] = useState("ingles")

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    fetchSession();

    // Opcional: escuchar cambios de sesión
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AppContext.Provider value={{ session, setSession, idioma, setIdioma}}>
      {children}
    </AppContext.Provider>
  );
};
