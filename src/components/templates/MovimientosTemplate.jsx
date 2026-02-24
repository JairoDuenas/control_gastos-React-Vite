import styled from "styled-components";
import { useState } from "react";
import { Header } from "../organismos/Header";
import { CalendarioLineal } from "../organismos/CalendarioLineal";
import dayjs from "dayjs";
import { CardTotales } from "../organismos/CardTotales";
import { useOperaciones } from "../../store/OperacionesStore";
import { v } from "../../styles/variables";
//import { useQuery } from "@tanstack/react-query";
import { useMovimientosStore } from "../../store/MovimientosStore";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { Device } from "../../styles/breakPoins";
import { TablaMovimientos } from "../organismos/tablas/TablaMovimientos";
import { useCuentaStore } from "../../store/CuentaStore";
import { useCategoriasStore } from "../../store/CategoriasStore";
import { DataDesplegableMovimientos } from "../../utils/dataEstatica";
import { ContentFiltros } from "../atomos/ContentFiltros";
import { ContentFiltro } from "../atomos/ContentFiltro";
import { BtnDesplegable } from "../moleculas/BtnDesplegable";
import { ListaMenuDesplegable } from "../moleculas/ListaMenuDesplegable";
import { BtnFiltro } from "../moleculas/BtnFiltro";
import { RegistrarMovimientos } from "../organismos/formularios/RegistrarMovimientos";
import { useRegistroControls } from "../../hooks/useRegistroControls.jsx.jsx";
import { useMovimientosQueries } from "../../queries/useMovimientosQueries.jsx";
import { SpinnerLoader } from "../moleculas/Spinner.jsx";

export function MovimientosTemplate() {
  // States
  const [value, setValue] = useState(dayjs(Date.now()));
  const [formatoFecha, setFormatoFecha] = useState("");

  // Stores
  const {
    tipo,
    setTipo,
    colorCategoria,
    año,
    mes,
    bgCategoria,
    tituloBtnDesMovimientos,
  } = useOperaciones();
  const { id_usuario } = useUsuariosStore();
  const { mostrarCategorias } = useCategoriasStore();
  const {
    totalMesAño,
    totalMesAñoPagados,
    totalMesAñoPendientes,
    mostrarMovimientos,
    datamovimientos,
  } = useMovimientosStore();
  const { mostrarCuentas } = useCuentaStore();

  // Custom hook useRegistroControls
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

  // Custom hook usemovimientosQueries
  const { movimientosQuery, cuentasQuery, categoriasQuery } =
    useMovimientosQueries({
      año,
      mes,
      id_usuario,
      tipo,
      mostrarMovimientos,
      mostrarCuentas,
      mostrarCategorias,
    });

  const isLoading =
    movimientosQuery.isLoading ||
    cuentasQuery.isLoading ||
    categoriasQuery.isLoading;

  //if (isLoading) return <SpinnerLoader />;

  return (
    <Container onClick={cerrarDesplegables}>
      {openRegistro && (
        <RegistrarMovimientos
          dataSelect={dataSelect}
          state={openRegistro}
          accion={accion}
          setState={() => setOpenRegistro(!openRegistro)}
        />
      )}
      <header className="header">
        <Header stateConfig={{ state: state, setState: openUser }} />
      </header>
      <section className="tipo">
        <div className="filter-glass-card ">
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

      <section className="totales">
        <CardTotales
          total={totalMesAñoPendientes}
          title={tipo == "g" ? "Gastos pendientes" : "Ingresos pendientes"}
          color={colorCategoria}
          icono={<v.flechaarribalarga />}
        />
        <CardTotales
          total={totalMesAñoPagados}
          title={tipo == "g" ? "Gastos pagados" : "Ingresos pagados"}
          color={colorCategoria}
          icono={<v.flechaabajolarga />}
        />
        <CardTotales
          total={totalMesAño}
          title="Total"
          color={colorCategoria}
          icono={<v.balance />}
        />
      </section>

      <section className="calendario">
        <CalendarioLineal
          value={value}
          setValue={setValue}
          formatoFecha={formatoFecha}
          setFormatoFecha={setFormatoFecha}
        />
      </section>
      <section className="main">
        <ContentWrapper>
          <div className="table-responsive">
            <TablaMovimientos
              data={datamovimientos}
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

  .totales {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr;
    gap: 10px;
    font-weight: 700;

    @media ${Device.tablet} {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .calendario {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main {
    width: 100%;
    overflow-y: auto;

    .glow-bar {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60%;
      height: 2px;
      background: ${({ bordercolor }) => bordercolor};
      box-shadow: 0 0 12px ${({ bordercolor }) => bordercolor};
      opacity: 0.8;
    }
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
