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
import { useRegistroControls } from "../../hooks/useRegistroControls.jsx";
import { useMovimientosQueries } from "../../hooks/useMovimientosQueries.jsx";

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

  const { isLoading: loadingMovimientos } = movimientosQuery;
  const { isLoading: loadingCuentas } = cuentasQuery;
  const { isLoading: loadingCategorias } = categoriasQuery;

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
        <ContentFiltro>
          <BtnFiltro
            funcion={nuevoRegistro}
            bgcolor={bgCategoria}
            textcolor={colorCategoria}
            icono={<v.agregar />}
          />
        </ContentFiltro>
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
        <TablaMovimientos
          data={datamovimientos}
          setOpenRegistro={setOpenRegistro}
          setDataSelect={setDataSelect}
          setAccion={setAccion}
        />
      </section>
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: grid;
  grid-template:
    "header" 100px
    "tipo" 100px
    "totales" 360px
    "calendario" 100px
    "main" auto;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};

  @media ${Device.tablet} {
    grid-template:
      "header" 100px
      "tipo" 100px
      "totales" 100px
      "calendario" 100px
      "main" auto;
  }

  .header {
    grid-area: header;
    //background-color: rgba(103, 93, 241, 0.14);
    display: flex;
    align-items: center;
    z-index: 3;
  }
  .tipo {
    grid-area: tipo;
    //background-color: rgba(107, 214, 14, 0.14);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .totales {
    grid-area: totales;
    //background-color: rgba(229, 67, 26, 0.14);
    display: grid;
    align-items: center;
    grid-template-columns: 1fr;
    gap: 10px;

    @media ${Device.tablet} {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .calendario {
    grid-area: calendario;
    //background-color: rgba(77, 237, 106, 0.14);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main {
    grid-area: main;
    //background-color: rgba(179, 46, 241, 0.14);
  }
`;
