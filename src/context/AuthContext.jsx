import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase.config";
import { InsertarUsuarios } from "../supabase/crudUsuarios";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session == null) {
          setUser(null);
        } else {
          setUser(session?.user.user_metadata);
          isertarUsuarios(session?.user.user_metadata, session?.user.id);
        }
      },
    );
    return () => {
      authListener.subscription;
    };
  }, []);

  const isertarUsuarios = async (dataProvider, idauth_supabase) => {
    const p = {
      nombres: dataProvider.name,
      foto: dataProvider.picture,
      idauth_supabase: idauth_supabase,
    };
    await InsertarUsuarios(p);
  };
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(AuthContext);
};
