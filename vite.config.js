import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          lottie: ["lottie-react", "lottie-web"],
          mui: ["@mui/material", "@emotion/react", "@emotion/styled"],
          charts: ["chart.js", "react-chartjs-2"],
          motion: ["framer-motion"],
          supabase: ["@supabase/supabase-js"],
          query: ["@tanstack/react-query"],
          swiper: ["swiper"],
        },
      },
    },
  },
});
