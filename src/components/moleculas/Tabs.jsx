import { useState } from "react";
import styled from "styled-components";
import { v } from "../../styles/variables";
import { Dona } from "../organismos/graficas/Dona";
import { Lineal } from "./graficas/Lineal";
import { Barras } from "./graficas/Barras";
import { useMovimientosStore } from "../../store/MovimientosStore";
import { useOperaciones } from "../../store/OperacionesStore";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { useInformesGrafica } from "../../hooks/useInformesGrafica";
import { useReporteMovimientosQuery } from "../../queries/useReporteMovimientosQuery";
import { SkeletonGrafica } from "../moleculas/SkeletonGrafica.jsx";

export function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const handleClick = (index) => setActiveTab(index);

  const { id_usuario } = useUsuariosStore();
  const { año, mes, tipo, tituloBtnDesMovimientos } = useOperaciones();
  const { dataRptMovimientosAñoMes } = useMovimientosStore();
  const { datagrafica } = useInformesGrafica();

  const { isLoading } = useReporteMovimientosQuery({
    año,
    mes,
    tipo,
    id_usuario,
  });

  const componentes = { 0: Dona, 1: Lineal, 2: Barras };
  const ComponenteActivo = componentes[activeTab];

  return (
    <Container $activeTab={`${activeTab}00%`}>
      {/* ── Selector de tabs ── */}
      <ul className="tabs">
        <li
          className={activeTab === 0 ? "active" : ""}
          onClick={() => handleClick(0)}
        >
          <v.iconopie />
        </li>
        <li
          className={activeTab === 1 ? "active" : ""}
          onClick={() => handleClick(1)}
        >
          <v.iconolineal />
        </li>
        <li
          className={activeTab === 2 ? "active" : ""}
          onClick={() => handleClick(2)}
        >
          <v.iconobars />
        </li>
        <span className="glider" />
      </ul>

      {/* ── Contenido ── */}
      <div className="tab-content">
        {isLoading ? (
          <SkeletonGrafica bars={7} height="260px" />
        ) : ComponenteActivo ? (
          <ComponenteActivo
            datagrafica={datagrafica}
            data={dataRptMovimientosAñoMes}
            titulo={tituloBtnDesMovimientos}
          />
        ) : null}
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 95%;

  .tabs {
    list-style: none;
    display: flex;
    box-shadow: 0px 10px 20px -3px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.bg3};
    position: relative;
    border-radius: 100px;
    justify-content: space-between;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 54px;
      width: 150px;
      font-size: 1.8rem;
      font-weight: 500;
      cursor: pointer;
      z-index: 2;
    }

    .glider {
      position: absolute;
      display: flex;
      height: 54px;
      width: 150px;
      background-color: ${({ theme }) => theme.bg5};
      z-index: 1;
      border-radius: 99px;
      transition: 0.25s ease-in-out;
      box-shadow: 0px 10px 20px -3px ${({ theme }) => theme.bg5};
      transform: translateX(${({ $activeTab }) => $activeTab});
    }
  }

  .tab-content {
    position: relative;
    border-radius: 6px;
    margin-top: 20px;
    padding: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.bg5};
    font-size: 1rem;
  }
`;
