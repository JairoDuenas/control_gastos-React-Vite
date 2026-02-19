import { ObtenerIdAuthSupabase } from "./globalSupabase";
import { supabase } from "./supabase.config";
import Swal from "sweetalert2";

export const InsertarUsuarios = async (p) => {
  try {
    const { data } = await supabase
      .from("usuarios")
      .upsert(p, { onConflict: "idauth_supabase" })
      .select();
    return data;
  } catch (error) {
    alert(error.error_description || error.message + "usuarios");
  }
};

export const MostrarUsuarios = async () => {
  try {
    const idAuthSupabase = await ObtenerIdAuthSupabase();
    const { error, data } = await supabase
      .from("usuarios")
      .select()
      .eq("idauth_supabase", idAuthSupabase)
      .maybeSingle();

    if (error) {
      alert("MostrarUsuariso", error);
    }
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error en MostrarUsuarios:", error);
  }
};

export async function EditarMonedaUser(p) {
  try {
    const { error } = await supabase.from("usuarios").update(p).eq("id", p.id);
    if (error) {
      alert("Error al editar usuarios", error);
    }
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Datos modificados correctamente",
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (error) {
    alert(error.error_description || error.message + "EditarMonedaUser");
  }
}
