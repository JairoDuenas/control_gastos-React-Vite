import { useQuery } from "@tanstack/react-query";
import { useMovimientosStore } from "../store/MovimientosStore";

export function useReporteMovimientosQuery({ año, mes, tipo, id_usuario }) {
  const { rptMovimientosAñoMes } = useMovimientosStore();

  // Query para reporte de movimientos
  const reporteMovimientosQuery = useQuery({
    queryKey: ["reporte movimientos", año, mes, tipo, id_usuario],
    queryFn: () =>
      rptMovimientosAñoMes({
        año: año,
        mes: mes,
        tipocategoria: tipo,
        id_usuario: id_usuario,
      }),
    enabled: !!id_usuario,
  });

  return reporteMovimientosQuery;
}
