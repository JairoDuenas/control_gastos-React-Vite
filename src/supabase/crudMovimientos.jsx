import { supabase } from "./supabase.config";
import Swal from "sweetalert2";

// Función para insertar movimientos
export const InsertarMovimientos = async (p) => {
  try {
    const { data, error } = await supabase
      .from("movimientos")
      .insert(p)
      .select();

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ya existe un registro con " + p.descripcion,
        footer: '<a href="">Agregue una nueva descripcion </a>',
      });
    }

    if (data) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Datos ingresados",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  } catch (error) {
    alert(error.error_description || error.message + "insertar movimientos");
  }
};

// Función para eliminar movimientos
export async function EliminarMovimientos(p) {
  try {
    const { error } = await supabase
      .from("movimientos")
      .delete()
      .eq("id", p.id);

    if (error) {
      alert("Error al eliminar", error);
    }
  } catch (error) {
    alert(error.error_description || error.message + " eliminar movimientos");
  }
}

// Función para mostrar movimientos
export async function MostrarMovimientosPorMesAño(p) {
  try {
    const { data } = await supabase.rpc("mmovimientosmesanio", {
      anio: p.año,
      mes: p.mes,
      id_user: p.id_usuario,
      tipocategoria: p.tipocategoria,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Función para reporte de movimientos
export async function RptMovimientosPorMesAño(p) {
  try {
    const { data } = await supabase.rpc("rptmovimientos_anio_mes", {
      anio: p.año,
      mes: p.mes,
      id_user: p.id_usuario,
      tipocategoria: p.tipocategoria,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function EditarMovimientos(p) {
  try {
    const { error } = await supabase
      .from("movimientos")
      .update(p)
      .eq("id", p.id);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Movimiento actualizado",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (error) {
    console.error(error);
  }
}
