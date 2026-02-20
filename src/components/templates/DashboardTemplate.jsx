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
import { useQuery } from "@tanstack/react-query";

import { Device } from "../../styles/breakPoins";
import { v } from "../../styles/variables";
import { Dona } from "../organismos/graficas/Dona";

export function DashboardTemplate() {
  const {
    setTipo,
    colorCategoria,
    bgCategoria,
    tituloBtnDesMovimientos,
    año,
    mes,
    tipo,
  } = useOperaciones();

  const [state, setState] = useState(false);
  const [stateTipo, setStateTipo] = useState(false);
  const [value, setValue] = useState(dayjs(Date.now()));
  const [formatoFecha, setFormatoFecha] = useState("");
  const { id_usuario } = useUsuariosStore();

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

  // Función para cerrar listas deplegables
  function cerrarDesplegables() {
    setStateTipo(false);
    setState(false);
  }

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

  // Función para abrir usuario de manera idependiente
  function openUser() {
    setState(!state);
    setStateTipo(false);
  }

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
        <Dona
          datagrafica={datagrafica}
          data={dataRptMovimientosAñoMes}
          titulo={tituloBtnDesMovimientos}
        />
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
