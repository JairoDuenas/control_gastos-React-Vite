import { create } from "zustand";

import {
  EditarCategorias,
  EliminarCategorias,
  EliminarCategoriasTodas,
  InsertarCategorias,
  MostrarCategorias,
} from "../supabase/crudCategorias";

export const useCategoriasStore = create((set, get) => ({
  dataCategorias: [],
  categoriaItemSelect: null,
  parametros: {},

  mostrarCategorias: async (p) => {
    const response = await MostrarCategorias(p);
    set({ parametros: p });
    set({
      dataCategorias: response || [],
      categoriaItemSelect: response?.[0] || null,
    });
    return response;
  },

  selectCategoria: (p) => {
    set({ categoriaItemSelect: p });
  },

  insertarCategorias: async (p) => {
    await InsertarCategorias(p);
    const { mostrarCategorias } = get();
    const { parametros } = get();
    set(mostrarCategorias(parametros));
  },

  eliminarCategorias: async (p) => {
    await EliminarCategorias(p);
    const { mostrarCategorias } = get();
    set(mostrarCategorias(p));
  },

  eliminarCategoriasTodas: async (p) => {
    await EliminarCategoriasTodas(p);
    const { mostrarCategorias } = get();
    set(mostrarCategorias(p));
  },
  editarCategorias: async (p) => {
    await EditarCategorias(p);
    const { mostrarCategorias } = get();
    set(mostrarCategorias(p));
  },
}));
