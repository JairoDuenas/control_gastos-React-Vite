import styled from "styled-components";
import { Header } from "../organismos/Header";
import { useState } from "react";
import { ContentFiltros } from "../atomos/ContentFiltros";
import { BtnDesplegable } from "../moleculas/BtnDesplegable";
import { useOperaciones } from "../../store/OperacionesStore";
import { ListaMenuDesplegable } from "../moleculas/ListaMenuDesplegable";
import { DataDesplegableTipo } from "../../utils/dataEstatica";
import { ContentFiltro } from "../atomos/ContentFiltro";
import { BtnFiltro } from "../moleculas/BtnFiltro";
import { v } from "../../styles/variables";
import { TablaCategorias } from "../../components/organismos/tablas/TablaCategorias";
import { RegistrarCategorias } from "../organismos/formularios/RegistrarCategorias";
import { LottieAnimacion } from "../moleculas/LottieAnimacion";
import vacioverde from "../../assets/vacioverde.json";
import vaciorojo from "../../assets/vaciorojo.json";

export function CategoriaTemplate({ data }) {
  const [openRegistro, setOpenRegistro] = useState(false);
  const [accion, setAccion] = useState("");
  const [dataSelect, setDataSelect] = useState([]);
  const [state, setState] = useState(false);
  const [stateTipo, setStateTipo] = useState(false);
  const { colorCategoria, tituloBtnDes, bgCategoria, setTipo, tipo } =
    useOperaciones();

  // Función para cambiar tipo
  function cambiarTipo(p) {
    setTipo(p);
    setStateTipo(!stateTipo);
    setState(false);
  }

  // Función para cerrar listas deplegables
  function cerrarDesplegables() {
    setStateTipo(false);
    setState(false);
  }

  // Función para abrir tipo de manera idependiente
  function openTipo() {
    setStateTipo(!stateTipo);
    setState(false);
  }

  // Función para abrir usuario de manera idependiente
  function openUser() {
    setState(!state);
    setStateTipo(false);
  }

  // Función para crear nuevo registro
  function nuevoRegistro() {
    setOpenRegistro(!openRegistro);
    setAccion("Nuevo");
    setDataSelect([]);
  }

  return (
    <Container onClick={cerrarDesplegables}>
      {openRegistro && (
        <RegistrarCategorias
          dataSelect={dataSelect}
          onClose={() => setOpenRegistro(!openRegistro)}
          accion={accion}
          //setState={() => setopenRegistro(!openRegistro)}
        />
      )}

      <header className="header">
        <Header stateConfig={{ state: state, setState: openUser }} />
      </header>

      <section className="tipo">
        <ContentFiltros>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <BtnDesplegable
              textcolor={colorCategoria}
              bgcolor={bgCategoria}
              text={tituloBtnDes}
              funcion={openTipo}
            />

            {stateTipo && (
              <ListaMenuDesplegable
                data={DataDesplegableTipo}
                top="112%"
                funcion={(p) => cambiarTipo(p)}
              />
            )}
          </div>
        </ContentFiltros>
        <ContentFiltro>
          <BtnFiltro
            funcion={nuevoRegistro}
            bgcolor={bgCategoria}
            textcolor={colorCategoria}
            icono={<v.agregar />}
          />
        </ContentFiltro>
      </section>
      <section className="main">
        {data.length == 0 && (
          <LottieAnimacion
            alto="300px"
            ancho="300px"
            animacion={tipo == "i" ? vacioverde : vaciorojo}
          />
        )}

        <TablaCategorias
          data={data}
          setOpenRegistro={setOpenRegistro}
          setDataSelect={setDataSelect}
          setAccion={setAccion}
        />
      </section>
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 15px;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  grid-template: "header" 100px "tipo" 100px "main" auto;
  box-sizing: border-box;
  overflow: hidden;

  .header {
    grid-area: header;
    //background-color: rgba(103, 93, 241, 0.14);
    display: flex;
    align-items: center;
    z-index: 3;
  }

  .tipo {
    grid-area: tipo;
    //background-color: rgba(229, 67, 26, 0.14);
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 2;

    //padding: 20px;
  }

  .main {
    grid-area: main;
    //background-color: rgba(179, 46, 241, 0.14);
  }
`;
