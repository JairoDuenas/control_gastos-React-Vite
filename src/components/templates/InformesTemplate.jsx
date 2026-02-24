import styled from "styled-components";
import { Header } from "../organismos/Header";
import { useState } from "react";
import dayjs from "dayjs";
import { CalendarioLineal } from "../organismos/CalendarioLineal";
import { Device } from "../../styles/breakPoins";
import { Tabs } from "../organismos/Tabs";
import { ContentFiltros } from "../atomos/ContentFiltros";
import { BtnDesplegable } from "../moleculas/BtnDesplegable";
import { ListaMenuDesplegable } from "../moleculas/ListaMenuDesplegable";
import { DataDesplegableMovimientos } from "../../utils/dataEstatica";
import { useOperaciones } from "../../store/OperacionesStore";
import { v } from "../../styles/variables";
import { useRegistroControls } from "../../hooks/useRegistroControls.jsx";

export function InformesTemplate() {
  const { setTipo, colorCategoria, bgCategoria, tituloBtnDesMovimientos } =
    useOperaciones();

  const [value, setValue] = useState(dayjs(Date.now()));
  const [formatoFecha, setFormatoFecha] = useState("");

  const {
    cerrarDesplegables,
    state,
    stateTipo,
    openTipo,
    cambiarTipo,
    openUser,
  } = useRegistroControls({ setTipo });

  return (
    <Container onClick={cerrarDesplegables}>
      <header className="header">
        <Header stateConfig={{ state: state, setState: openUser }} />
      </header>

      <div className="tipo">
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
          <h2>Informes</h2>
        </div>
      </div>

      <section className="calendario">
        <CalendarioLineal
          value={value}
          setValue={setValue}
          formatoFecha={formatoFecha}
          setFormatoFecha={setFormatoFecha}
        />
      </section>
      <ContentWrapper>
        <section className="tabs">
          <Tabs />
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

  .calendario {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tabs {
    animation: fadeIn 0.6s ease-out;
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
`;
