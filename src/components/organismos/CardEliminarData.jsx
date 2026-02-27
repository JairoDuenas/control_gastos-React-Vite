import styled from "styled-components";
import { BtnSave } from "../moleculas/BtnSave";
import { v } from "../../styles/variables";
import { useCategoriasStore } from "../../store/CategoriasStore";
import { useUsuariosStore } from "../../store/UsuariosStore";
import Swal from "sweetalert2";

export function CardEliminarData() {
  const { eliminarCategoriasTodas } = useCategoriasStore();
  const { datausuarios } = useUsuariosStore();
  const eliminar = async () => {
    Swal.fire({
      title: "¿Estás seguro(a)?",
      text: "Una vez eliminado, ¡no podrá recuperar estos registros!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const p = {
          id_usuario: datausuarios.id,
        };
        await eliminarCategoriasTodas(p);
      }
    });
  };
  return (
    <Container>
      <h2>Resetear todo</h2>
      <span>
        ⚠️ ADVERTENCIA!: *esta acción es irreversible, una vez ejecutada se
        eliminarán todos tus registros de movimientos incluso las categorías
        registradas. <br /> *Se reseteará también los saldos acumulados en tus
        cuentas.
      </span>
      <BtnSave
        titulo="Resetear"
        bgcolor="rgba(247,92,92,0.9)"
        funcion={eliminar}
      />
      <div className="contentImg">
        <img src={v.logo} alt="logo" />
      </div>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  border: 2px solid rgba(255, 99, 99, 0.9);
  background: rgb(42, 1, 1);
  background: linear-gradient(
    18deg,
    rgba(252, 69, 69, 0.12) 19%,
    rgba(252, 69, 69, 0.3) 100%
  );
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  //gap: 20px;
  padding-bottom: 20px;

  h2 {
    color: rgba(252, 69, 69, 0.72);
  }
  span {
    padding: 10px;
    font-size: 110%;
  }
  .contentImg {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 20%;
    opacity: 0.18;
    margin: 15px;
    img {
      width: 100%;
      display: block;
      animation: flotar 1.7s ease-in-out infinite alternate;
    }
  }

  @keyframes flotar {
    0% {
      transform: translate(0, 0px);
    }
    50% {
      transform: translate(0, 10px);
    }
    100% {
      transform: translate(0, -0px);
    }
  }
`;
