import { useState } from "react";

export function useRegistroControls({ setTipo }) {
  const [stateTipo, setStateTipo] = useState(false);
  const [state, setState] = useState(false);
  const [openRegistro, setOpenRegistro] = useState(false);
  const [accion, setAccion] = useState("");
  const [dataSelect, setDataSelect] = useState([]);

  // Cambiar tipo
  function cambiarTipo(p) {
    setTipo(p);
    setStateTipo(false);
    setState(false);
  }

  // Cerrar todos los desplegables
  function cerrarDesplegables() {
    setStateTipo(false);
    setState(false);
  }

  // Abrir tipo
  function openTipo() {
    setStateTipo((prev) => !prev);
    setState(false);
  }

  // Abrir usuario
  function openUser() {
    setState((prev) => !prev);
    setStateTipo(false);
  }

  // Nuevo registro
  function nuevoRegistro() {
    setOpenRegistro((prev) => !prev);
    setAccion("Nuevo");
    setDataSelect([]);
  }

  return {
    // estados
    stateTipo,
    state,
    openRegistro,
    accion,
    dataSelect,

    // setters si los necesitas
    setStateTipo,
    setState,
    setOpenRegistro,
    setAccion,
    setDataSelect,

    // funciones
    cambiarTipo,
    cerrarDesplegables,
    openTipo,
    openUser,
    nuevoRegistro,
  };
}
