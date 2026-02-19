import { create } from "zustand";
import { v } from "../styles/variables";

export const useOperaciones = create((set, get) => ({
  tipo: "i",
  tituloBtnDes: "Categorias ingresos",
  tituloBtnDesMovimientos: "Ingresos",
  colorCategoria: () => v.colorIngresos,
  bgCategoria: () => v.colorbgingresos,
  año: null,
  mes: null,

  setMes: (p) => {
    set({ mes: p });
  },

  setAño: (p) => {
    set({ año: p });
  },

  setTipo: (p) => {
    set({
      tipo: p.tipo,
      tituloBtnDes: p.text,
      tituloBtnDesMovimientos: p.text,
      colorCategoria: p.color,
      bgCategoria: p.bgcolor,
    });
  },
}));
