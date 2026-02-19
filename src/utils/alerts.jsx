import Swal from "sweetalert2";

export const alertSuccess = (mensaje) => {
  return;
};

try {
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
  console.error(error);
  //alert(error.error_description || error.message + "insertar movimientos");
}
