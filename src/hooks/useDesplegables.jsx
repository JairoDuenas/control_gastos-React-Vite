import { useState } from "react";

export function useDesplegables() {
  const [stateUser, setStateUser] = useState(false);
  const [stateTipo, seStateTipo] = useState(false);

  // Función para cerrar listas deplegables
  function cerrarDesplegables() {
    setStateUser(false);
    seStateTipo(false);
  }

  // Función para cerrar desplegable tipo
  function toggleUser() {
    setStateUser((prev) => !prev);
    seStateTipo(false);
  }

  // Función para cerrar desplegables usuario
  function toggleTipo() {
    seStateTipo((prev) => !prev);
    setStateUser(false);
  }
  return { stateUser, stateTipo, toggleUser, toggleTipo, cerrarDesplegables };
}
