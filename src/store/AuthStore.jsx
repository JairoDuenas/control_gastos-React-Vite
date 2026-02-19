import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";

export const useAuthStore = create(() => ({
  // Login con Google
  signInWithGoogle: async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error)
        throw new Error("A ocurrido un error durante la autenticación");
      return data;
    } catch (error) {
      console.error("Login Google:", error.message);
      throw error;
    }
  },
  cerrarSesion: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message || "Error al cerrar la sesión");
      }
    } catch (error) {
      console.error("Cerrar sesión", error.message);
      throw error;
    }
  },
}));
