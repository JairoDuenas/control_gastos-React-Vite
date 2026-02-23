import { useMemo } from "react";
import { useMovimientosStore } from "../store/MovimientosStore";

// Gráfica de dona con chartjs

export function useDashboardGrafica() {
  const { dataRptMovimientosAñoMes } = useMovimientosStore();

  const datagrafica = useMemo(() => {
    return {
      type: "line",
      labels: dataRptMovimientosAñoMes?.map((item) => item.descripcion),
      datasets: [
        {
          tension: 0.3,
          filler: true,
          label: "Total",
          spacing: 5,
          borderRadius: 5,
          borderAlign: "inner",
          minBarLength: "100px",
          data: dataRptMovimientosAñoMes?.map((item) => item.total),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 2,
        },
      ],
    };
  }, [dataRptMovimientosAñoMes]);

  return { datagrafica };
}
