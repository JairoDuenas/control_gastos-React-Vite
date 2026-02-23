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
import { Device } from "../../styles/breakPoins";
import { v } from "../../styles/variables";
import { Dona } from "../organismos/graficas/Dona";
import { useRegistroControls } from "../../hooks/useRegistroControls.jsx.jsx";
import { useDashboardQuery } from "../../queries/useDashboardQuery.jsx";
import { useDashboardGrafica } from "../../hooks/useDashboardGrafica.jsx";
import { SpinnerLoader } from "../moleculas/Spinner.jsx";

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
  const { isLoading } = useDashboardQuery({
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

      <section className="dashboard">
        <ContentFiltros>
          <div
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
        </ContentFiltros>
        <h2>Dashboard</h2>
      </section>
      <section className="calendario">
        <CalendarioLineal
          value={value}
          setValue={setValue}
          formatoFecha={formatoFecha}
          setFormatoFecha={setFormatoFecha}
        />
      </section>
      <section className="card">
        {isLoading ? (
          <SpinnerWrapper>
            <SpinnerLoader />
          </SpinnerWrapper>
        ) : (
          <Dona
            datagrafica={datagrafica}
            data={dataRptMovimientosAñoMes}
            titulo={tituloBtnDesMovimientos}
          />
        )}
      </section>
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 15px;
  //gap: 20px;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  box-sizing: border-box;
  overflow: hidden;
  grid-template: "header" 100px "dashboard" 100px "calendario" 50px "card" auto;

  @media ${Device.tablet} {
    grid-template:
      "header" 100px
      "dashboard" 100px
      "calendario" 80px
      "card" auto;
  }

  .header {
    grid-area: header;
    // background-color: rgba(103, 93, 241, 0.14);
    display: flex;
    align-items: center;
  }

  .dashboard {
    grid-area: dashboard;
    //background-color: rgba(229, 67, 26, 0.14);
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .calendario {
    grid-area: calendario;
    //background-color: rgba(77, 237, 106, 0.14);
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
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; /* o lo que mida tu card */
`;
