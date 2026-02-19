import { supabase } from "./supabase.config";

export async function MostrarCuentas(p) {
  try {
    const { data } = await supabase
      .from("cuenta")
      .select()
      .eq("id_usuario", p.id_usuario)
      .maybeSingle();

    if (data) {
      return data;
    }
    return data;
  } catch (error) {
    alert(error.error_description || error.message + "mostrar cuentas");
  }
}
