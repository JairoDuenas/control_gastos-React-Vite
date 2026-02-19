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
import { BtnFiltro } from "../moleculas/BtnFiltro";
import { DataDesplegableMovimientos } from "../../utils/dataEstatica";
import { useOperaciones } from "../../store/OperacionesStore";
import { ContentFiltro } from "../atomos/ContentFiltro";
import { v } from "../../styles/variables";

export function InformesTemplate() {
  const {
    // tipo,
    setTipo,
    colorCategoria,
    //año,
    //mes,
    bgCategoria,
    tituloBtnDesMovimientos,
  } = useOperaciones();

  const [state, setState] = useState(false);
  const [value, setValue] = useState(dayjs(Date.now()));
  const [formatoFecha, setFormatoFecha] = useState("");
  const [stateTipo, setStateTipo] = useState(false);

  // Función para abrir tipo
  function openTipo() {
    setStateTipo(!stateTipo);
    setState(false);
  }

  // Función para cambiar tipo
  function cambiarTipo(p) {
    setTipo(p);
    setStateTipo(!stateTipo);
    setState(false);
  }

  return (
    <Container>
      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="informes">
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
        <h2>Informes</h2>
      </section>
      <section className="calendario">
        <CalendarioLineal
          value={value}
          setValue={setValue}
          formatoFecha={formatoFecha}
          setFormatoFecha={setFormatoFecha}
        />
      </section>
      <section className="tabs">
        <Tabs />
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
  box-sizing: border-box;
  overflow: hidden;
  grid-template: "header" 100px "informes" 100px "calendario" 50px "tabs" auto;

  @media ${Device.tablet} {
    grid-template:
      "header" 100px
      "informes" 100px
      "calendario" 80px
      "tabs" auto;
  }

  .header {
    grid-area: header;
    //background-color: rgba(103, 93, 241, 0.14);
    display: flex;
    align-items: center;
  }

  .informes {
    grid-area: informes;
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

  .tabs {
    grid-area: tabs;
    //background-color: rgba(179, 46, 241, 0.14);
  }
`;
