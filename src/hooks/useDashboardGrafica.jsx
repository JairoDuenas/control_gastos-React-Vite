import { useMemo } from "react";
import { useMovimientosStore } from "../store/MovimientosStore";

export function useDashboardGrafica() {
  const { dataRptMovimientosAñoMes } = useMovimientosStore();

  const { datagrafica, options } = useMemo(() => {
    const labels =
      dataRptMovimientosAñoMes?.map((item) => item.descripcion) ?? [];

    const data = dataRptMovimientosAñoMes?.map((item) => item.total) ?? [];

    return {
      datagrafica: {
        labels,
        datasets: [
          {
            label: "Reporte",
            data,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            pointBackgroundColor: "#36A2EB",
            pointBorderColor: "#fff",
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "#888",
            },
          },
        },
        scales: {
          r: {
            grid: {
              color: "rgba(200,200,200,0.2)",
            },
            angleLines: {
              color: "rgba(200,200,200,0.2)",
            },
            ticks: {
              backdropColor: "transparent",
            },
          },
        },
      },
    };
  }, [dataRptMovimientosAñoMes]);

  return { datagrafica, options };
}
