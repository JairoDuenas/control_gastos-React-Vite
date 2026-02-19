import { create } from "zustand";
import { EditarMonedaUser, MostrarUsuarios } from "../supabase/crudUsuarios";

export const useUsuariosStore = create((set, get) => ({
  id_usuario: 0,
  datausuarios: [],

  mostrarUsuarios: async () => {
    const response = await MostrarUsuarios();
    set({ datausuarios: response });
    if (response) {
      set({ id_usuario: response.id });
      return response;
    } else {
      return [];
    }
  },

  editarMonedaUser: async (p) => {
    await EditarMonedaUser(p);
    const { mostrarUsuarios } = get();
    set(mostrarUsuarios);
  },
}));
