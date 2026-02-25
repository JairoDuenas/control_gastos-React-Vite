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
import { ContentWrapper } from "../atomos/ContentWrapper.jsx";
import { FilterGlass } from "../atomos/FilterGlass.jsx";

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
        <FilterGlass>
          <div
            className="dropdown-container"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ContentFiltros>
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
            </ContentFiltros>
          </div>
          <h2>Informes</h2>
        </FilterGlass>
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
  }

  .dropdown-container {
    position: relative;
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
