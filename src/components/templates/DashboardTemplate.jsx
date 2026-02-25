import styled from "styled-components";
import { Header } from "../organismos/Header";
import { useState } from "react";
import { BtnDesplegable } from "../moleculas/BtnDesplegable";
import { ContentFiltros } from "../atomos/ContentFiltros";
import { ListaMenuDesplegable } from "../moleculas/ListaMenuDesplegable";
import { useOperaciones } from "../../store/OperacionesStore";
import { DataDesplegableMovimientos } from "../../utils/dataEstatica";
import { CalendarioLineal } from "../organismos/CalendarioLineal";
import dayjs from "dayjs";
import { useMovimientosStore } from "../../store/MovimientosStore";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { v } from "../../styles/variables";
import { Dona } from "../organismos/graficas/Dona";
import { useRegistroControls } from "../../hooks/useRegistroControls.jsx.jsx";
import { useInformesGrafica } from "../../hooks/useInformesGrafica.jsx";
import { SpinnerLoader } from "../moleculas/Spinner.jsx";
import { SpinnerWrapper } from "../atomos/SpinnerWraper.jsx";
import { FilterGlass } from "../atomos/FilterGlass.jsx";
import { ContentWrapper } from "../atomos/ContentWrapper.jsx";
import { useReporteMovimientosQuery } from "../../queries/useReporteMovimientosQuery.jsx";
import { RadarGrafica } from "../organismos/graficas/Radar.jsx";
import { useDashboardGrafica } from "../../hooks/useDashboardGrafica.jsx";

export function DashboardTemplate() {
  const [value, setValue] = useState(dayjs(Date.now()));
  const [formatoFecha, setFormatoFecha] = useState("");
  const { id_usuario } = useUsuariosStore();

  const { dataRptMovimientosAñoMes } = useMovimientosStore();

  const {
    setTipo,
    colorCategoria,
    bgCategoria,
    tituloBtnDesMovimientos,
    año,
    mes,
    tipo,
  } = useOperaciones();

  const {
    cerrarDesplegables,
    state,
    openUser,
    openTipo,
    stateTipo,
    cambiarTipo,
  } = useRegistroControls({ setTipo });

  // Query
  const { isLoading } = useReporteMovimientosQuery({
    año,
    mes,
    tipo,
    id_usuario,
  });

  // Gráfica con chartjs
  const { datagrafica } = useDashboardGrafica();

  return (
    <Container onClick={cerrarDesplegables}>
      <header className="header">
        <Header stateConfig={{ state: state, setState: openUser }} />
      </header>

      <section className="tipo">
        <FilterGlass>
          <div
            className="dropdown-container"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <BtnDesplegable
              textcolor={colorCategoria}
              bgcolor={bgCategoria}
              text={tituloBtnDesMovimientos}
              funcion={openTipo}
            />

            {stateTipo && (
              <ListaMenuDesplegable
                data={DataDesplegableMovimientos}
                top="112%"
                funcion={(p) => cambiarTipo(p)}
              />
            )}
          </div>
          <h2>Dashboard</h2>
        </FilterGlass>
      </section>
      <section className="calendario">
        <CalendarioLineal
          value={value}
          setValue={setValue}
          formatoFecha={formatoFecha}
          setFormatoFecha={setFormatoFecha}
        />
      </section>
      <ContentWrapper>
        <section className="card">
          {isLoading ? (
            <SpinnerWrapper>
              <SpinnerLoader />
            </SpinnerWrapper>
          ) : (
            <RadarGrafica
              datagrafica={datagrafica}
              data={dataRptMovimientosAñoMes}
              titulo={tituloBtnDesMovimientos}
            />
          )}
        </section>
      </ContentWrapper>
    </Container>
  );
}
const Container = styled.div`
  min-height: 85vh;
  width: 100%;
  padding: 15px;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  gap: 25px;
  box-sizing: border-box;
  overflow: hidden;

  .header {
    display: flex;
    align-items: center;
    z-index: 3;
  }

  .tipo {
    z-index: 2;
  }

  .dropdown-container {
    position: relative;
  }

  .calendario {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.bg5};
    border-radius: 20px;
    margin-top: 20px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    padding: 20px 0;
  }
`;
