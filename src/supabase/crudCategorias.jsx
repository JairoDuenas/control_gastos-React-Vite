import Swal from "sweetalert2";
import { supabase } from "./supabase.config";

// Función para insertar categorías
export async function InsertarCategorias(p) {
  try {
    const { data, error } = await supabase
      .from("categorias")
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
        title: "Datos guardados",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  } catch (error) {
    alert(error.error_description || error.message + "insertar categorias");
  }
}

// Función para mostrar categorías
export async function MostrarCategorias(p) {
  try {
    const { data } = await supabase
      .from("categorias")
      .select()
      .eq("id_usuario", p.id_usuario)
      .eq("tipo", p.tipo)
      .order("id", { ascending: false });

    return data;
  } catch (error) {
    console.error("Error en MostrarCategorias:", error);
  }
}

// Función para eliminar categorías
export async function EliminarCategorias(p) {
  try {
    const { error } = await supabase
      .from("categorias")
      .delete()
      .eq("id_usuario", p.id_usuario)
      .eq("id", p.id);
    if (error) {
      alert("Error al eliminar", error);
    }
  } catch (error) {
    alert(error.error_description || error.message + " eliminar categorias");
  }
}

// Función para editar categorías
export async function EditarCategorias(p) {
  try {
    const { error } = await supabase
      .from("categorias")
      .update(p)
      .eq("id_usuario", p.id_usuario)
      .eq("id", p.id);

    if (error) {
      alert("Error al editar categorias", error);
    }
  } catch (error) {
    alert(error.error_description || error.message + " editar categorias");
  }
}

// Función para eliminar todas las categorías
export async function EliminarCategoriasTodas(p) {
  try {
    const { error } = await supabase
      .from("categorias")
      .delete()
      .eq("id_usuario", p.id_usuario);

    if (error) {
      alert("Error al eliminar todas las categorías", error);
    }
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Datos reseteados",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (error) {
    alert(
      error.error_description ||
        error.message + " eliminar todas las categorías",
    );
  }
}
