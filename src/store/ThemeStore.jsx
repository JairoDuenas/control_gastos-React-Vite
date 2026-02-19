import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Dark, Light } from "../styles/themes";

//export const useThemeStore = create((set, get) => ({
//theme: "light",
//themeStyle: Light,
//setTheme: () => {
//const { theme } = get();
//set({ theme: theme === "light" ? "dark" : "light" });
//set({ themeStyle: theme === "light" ? Dark : Light });
//},
//}));

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: "light",
      themeStyle: Light,
      setTheme: () => {
        const { theme } = get();
        const nextTheme = theme === "light" ? "dark" : "light";
        const nextStyle = nextTheme === "light" ? Light : Dark;

        set({ theme: nextTheme, themeStyle: nextStyle });
      },
    }),
    {
      name: "theme-storage", // Nombre de la llave en localStorage
    },
  ),
);
