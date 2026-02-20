import { useState } from "react";
import styled from "styled-components";
import { v } from "../../styles/variables";
import { Dona } from "../organismos/graficas/Dona";
import { Lineal } from "./graficas/Lineal";
import { Barras } from "./graficas/Barras";
import { useMovimientosStore } from "../../store/MovimientosStore";
import { useQuery } from "@tanstack/react-query";
import { useOperaciones } from "../../store/OperacionesStore";
import { useUsuariosStore } from "../../store/UsuariosStore";

export function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const handleClick = (index) => {
    setActiveTab(index);
  };

  const { id_usuario } = useUsuariosStore();
  const { año, mes, tipo, tituloBtnDesMovimientos } = useOperaciones();

  const { dataRptMovimientosAñoMes, rptMovimientosAñoMes } =
    useMovimientosStore();

  // Gráfica de dona con chartjs
  const datagrafica = {
    type: "line",
    labels: dataRptMovimientosAñoMes?.map((item) => item.descripcion),
    datasets: [
      {
        tension: 0.3,
        filler: true,
        label: "Total",
        spacing: 5,
        borderRadius: 5,
        borderAlign: "inner",
        minBarLength: "100px",
        data: dataRptMovimientosAñoMes?.map((item) => item.total),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Query para reporte de movimientos
  const { isLoading, error } = useQuery({
    queryKey: ["reporte movimientos", año, mes, tipo, id_usuario],
    queryFn: () =>
      rptMovimientosAñoMes({
        año: año,
        mes: mes,
        tipocategoria: tipo,
        id_usuario: id_usuario,
      }),
    enabled: !!id_usuario,
  });

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }
  if (error) {
    return <h1>Error</h1>;
  }

  // Layout
  return (
    <Container className="container" $activeTab={`${activeTab}00%`}>
      <ul className="tabs">
        <li
          className={activeTab === 0 ? "active" : ""}
          onClick={() => handleClick(0)}
        >
          {<v.iconopie />}
        </li>

        <li
          className={activeTab === 1 ? "active" : ""}
          onClick={() => handleClick(1)}
        >
          {<v.iconolineal />}
        </li>

        <li
          className={activeTab === 2 ? "active" : ""}
          onClick={() => handleClick(2)}
        >
          {<v.iconobars />}
        </li>
        <span className="glider"></span>
      </ul>

      <div className="tab-content">
        {activeTab == 0 && (
          <Dona
            datagrafica={datagrafica}
            data={dataRptMovimientosAñoMes}
            titulo={tituloBtnDesMovimientos}
          />
        )}

        {activeTab === 1 && (
          <Lineal
            datagrafica={datagrafica}
            data={dataRptMovimientosAñoMes}
            titulo={tituloBtnDesMovimientos}
          />
        )}
        {activeTab === 2 && (
          <Barras
            datagrafica={datagrafica}
            data={dataRptMovimientosAñoMes}
            titulo={tituloBtnDesMovimientos}
          />
        )}
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
  padding-top: 20px;

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
      transform: translateX(${(props) => props.$activeTab});
    }
  }

  .tab-content {
    position: relative;
    border-radius: 6px;
    margin-top: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.bg5};
    font-size: 1rem;
  }
`;
