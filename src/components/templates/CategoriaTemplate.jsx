import styled from "styled-components";
import { Header } from "../organismos/Header";
import { BtnDesplegable } from "../moleculas/BtnDesplegable";
import { useOperaciones } from "../../store/OperacionesStore";
import { ListaMenuDesplegable } from "../moleculas/ListaMenuDesplegable";
import { DataDesplegableTipo } from "../../utils/dataEstatica";
import { BtnFiltro } from "../moleculas/BtnFiltro";
import { v } from "../../styles/variables";
import { TablaCategorias } from "../../components/organismos/tablas/TablaCategorias";
import { RegistrarCategorias } from "../organismos/formularios/RegistrarCategorias";
import { LottieAnimacion } from "../moleculas/LottieAnimacion";
import vacioverde from "../../assets/vacioverde.json";
import vaciorojo from "../../assets/vaciorojo.json";
import { useRegistroControls } from "../../hooks/useRegistroControls.jsx";

export function CategoriaTemplate({ data }) {
  const { colorCategoria, tituloBtnDes, bgCategoria, setTipo, tipo } =
    useOperaciones();

  const {
    cerrarDesplegables,
    state,
    stateTipo,
    openUser,
    openTipo,
    cambiarTipo,
    nuevoRegistro,
    setDataSelect,
    dataSelect,
    accion,
    setAccion,
    setOpenRegistro,
    openRegistro,
  } = useRegistroControls({ setTipo });

  return (
    <Container onClick={cerrarDesplegables}>
      {openRegistro && (
        <RegistrarCategorias
          dataSelect={dataSelect}
          onClose={() => setOpenRegistro(!openRegistro)}
          accion={accion}
          state={openRegistro}
        />
      )}

      <header className="header">
        <Header stateConfig={{ state: state, setState: openUser }} />
      </header>

      <section className="tipo">
        <div className="filter-glass-card">
          <div
            className="dropdown-container"
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
          <div className="action-button">
            <BtnFiltro
              funcion={nuevoRegistro}
              bgcolor={bgCategoria}
              textcolor={colorCategoria}
              icono={<v.agregar />}
            />
          </div>
        </div>
      </section>

      <section className="main">
        <ContentWrapper>
          <div>
            {data.length == 0 && (
              <LottieAnimacion
                alto="300px"
                ancho="300px"
                animacion={tipo == "i" ? vacioverde : vaciorojo}
              />
            )}
          </div>

          <div className="table-responsive">
            <TablaCategorias
              data={data}
              setOpenRegistro={setOpenRegistro}
              setDataSelect={setDataSelect}
              setAccion={setAccion}
            />
          </div>
        </ContentWrapper>
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
  grid-template-rows: auto auto 1fr;
  gap: 25px;
  box-sizing: border-box;
  overflow: hidden;

  .header {
    display: flex;
    align-items: center;
    z-index: 10;
  }

  .tipo {
    z-index: 5;

    .filter-glass-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 20px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.03); /* Fondo translúcido */
      backdrop-filter: blur(15px); /* Efecto cristal */
      -webkit-backdrop-filter: blur(15px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    .dropdown-container {
      position: relative;
    }
  }

  .main {
    width: 100%;
    overflow-y: auto;
    padding-bottom: 20px;
  }
`;

const ContentWrapper = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 28px;
  padding: 25px;
  border: 1px solid ${({ theme }) => theme.colorborder};
  box-shadow: inset 0 0 30px ${({ theme }) => theme.shadowtable};
  min-height: 400px;
  display: flex;
  flex-direction: column;

  .table-responsive {
    animation: fadeIn 0.6s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
