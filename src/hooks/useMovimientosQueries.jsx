import { useQuery } from "@tanstack/react-query";

export function useMovimientosQueries({
  año,
  mes,
  id_usuario,
  tipo,
  mostrarMovimientos,
  mostrarCuentas,
  mostrarCategorias,
}) {
  // Movimientos
  const movimientosQuery = useQuery({
    queryKey: ["movimientos", año, mes, id_usuario, tipo],
    queryFn: () =>
      mostrarMovimientos({
        año,
        mes,
        id_usuario,
        tipocategoria: tipo,
      }),
    enabled: !!id_usuario,
  });

  // Cuentas
  const cuentasQuery = useQuery({
    queryKey: ["cuentas", id_usuario],
    queryFn: () =>
      mostrarCuentas({
        id_usuario,
      }),
    enabled: !!id_usuario,
  });

  // 🔹 Categorías
  const categoriasQuery = useQuery({
    queryKey: ["categorias", id_usuario, tipo],
    queryFn: () =>
      mostrarCategorias({
        id_usuario,
        tipo,
      }),
    enabled: !!id_usuario,
  });

  return {
    movimientosQuery,
    cuentasQuery,
    categoriasQuery,
  };
}
