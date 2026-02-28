import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { Header } from "../organismos/Header";
import { CalendarioLineal } from "../organismos/CalendarioLineal";
import dayjs from "dayjs";
import { CardTotales } from "../organismos/CardTotales";
import { useOperaciones } from "../../store/OperacionesStore";
import { v } from "../../styles/variables";
import { useMovimientosStore } from "../../store/MovimientosStore";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { Device } from "../../styles/breakPoins";
import { TablaMovimientos } from "../organismos/tablas/TablaMovimientos";
import { useCuentaStore } from "../../store/CuentaStore";
import { useCategoriasStore } from "../../store/CategoriasStore";
import { DataDesplegableMovimientos } from "../../utils/dataEstatica";
import { BtnDesplegable } from "../moleculas/BtnDesplegable";
import { ListaMenuDesplegable } from "../moleculas/ListaMenuDesplegable";
import { BtnFiltro } from "../moleculas/BtnFiltro";
import { RegistrarMovimientos } from "../organismos/formularios/RegistrarMovimientos";
import { useRegistroControls } from "../../hooks/useRegistroControls.jsx.jsx";
import { useMovimientosQueries } from "../../queries/useMovimientosQueries.jsx";
import { SkeletonTabla } from "../moleculas/SkeletonTabla.jsx";

// ─── Shared components ────────────────────────────────────────
import { BgBlobs } from "../atomos/BgBlobs";
import { PageContainer } from "../atomos/PageContainer";
import { ContentCard, CardAccentBar } from "../atomos/ContentCard";
import { MainSection } from "../atomos/MainSection";
import {
  HeaderRow,
  ToolbarRow,
  ToolbarGlass,
  ShimmerLine,
  ToolbarInner,
  DropdownWrap,
  ToolbarDivider,
  CalendarioSection,
} from "../moleculas/ToolbarGlass";

// ─── Animations ───────────────────────────────────────────────
import { fadeUp, cardPop } from "../../styles/animations.jsx";

// ─── Component ────────────────────────────────────────────────
export function MovimientosTemplate() {
  const [value, setValue] = useState(dayjs(Date.now()));
  const [formatoFecha, setFormatoFecha] = useState("");

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

  return (
    <PageContainer onClick={cerrarDesplegables}>
      <BgBlobs />

      {openRegistro && (
        <RegistrarMovimientos
          dataSelect={dataSelect}
          state={openRegistro}
          accion={accion}
          setState={() => setOpenRegistro(!openRegistro)}
        />
      )}

      {/* ── Header ── */}
      <HeaderRow>
        <Header stateConfig={{ state: state, setState: openUser }} />
      </HeaderRow>

      {/* ── Toolbar ── */}
      <ToolbarRow>
        <ToolbarGlass>
          <ShimmerLine />
          <ToolbarInner onClick={(e) => e.stopPropagation()}>
            <DropdownWrap>
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
            </DropdownWrap>

            <ToolbarDivider />

            <BtnFiltro
              funcion={nuevoRegistro}
              bgcolor={bgCategoria}
              textcolor={colorCategoria}
              icono={<v.agregar />}
            />
          </ToolbarInner>
        </ToolbarGlass>
      </ToolbarRow>

      {/* ── Totales ── */}
      <TotalesGrid>
        <TotalCard delay="0s" accent={colorCategoria}>
          <TotalCardGlow color={colorCategoria} />
          <CardTotales
            total={totalMesAñoPendientes}
            title={tipo === "g" ? "Gastos pendientes" : "Ingresos pendientes"}
            color={colorCategoria}
            icono={<v.flechaarribalarga />}
          />
        </TotalCard>

        <TotalCard delay="0.08s" accent={colorCategoria}>
          <TotalCardGlow color={colorCategoria} />
          <CardTotales
            total={totalMesAñoPagados}
            title={tipo === "g" ? "Gastos pagados" : "Ingresos pagados"}
            color={colorCategoria}
            icono={<v.flechaabajolarga />}
          />
        </TotalCard>

        <TotalCard delay="0.16s" accent={colorCategoria} highlight>
          <TotalCardGlow color={colorCategoria} strong />
          <CardTotales
            total={totalMesAño}
            title="Total"
            color={colorCategoria}
            icono={<v.balance />}
          />
        </TotalCard>
      </TotalesGrid>

      {/* ── Calendario ── */}
      <CalendarioSection>
        <CalendarioLineal
          value={value}
          setValue={setValue}
          formatoFecha={formatoFecha}
          setFormatoFecha={setFormatoFecha}
        />
      </CalendarioSection>

      {/* ── Tabla ── */}
      <MainSection>
        <ContentCard>
          <CardAccentBar color={bgCategoria} />
          <TableWrap>
            {isLoading ? (
              <SkeletonTabla rows={7} cols={5} />
            ) : (
              <TablaMovimientos
                data={datamovimientos}
                setOpenRegistro={setOpenRegistro}
                setDataSelect={setDataSelect}
                setAccion={setAccion}
              />
            )}
          </TableWrap>
        </ContentCard>
      </MainSection>
    </PageContainer>
  );
}

// ─── Styled Components ────────────────────────────────────────

/* ── Totales ── */

const TotalesGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  z-index: 1;
  position: relative;
  animation: ${fadeUp} 0.5s 0.1s ease both;

  @media ${Device.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TotalCard = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 14px;
  border-radius: 18px;
  background: ${({ highlight }) =>
    highlight ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.025)"};
  border: 1px solid
    ${({ highlight }) =>
      highlight ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)"};
  backdrop-filter: blur(16px);
  overflow: hidden;
  animation: ${cardPop} 0.5s ${({ delay }) => delay || "0s"} ease both;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.14);
  }
`;

const TotalCardGlow = styled.div`
  position: absolute;
  bottom: -30px;
  right: -20px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${({ color }) => color || "#bf94ff"};
  opacity: ${({ strong }) => (strong ? 0.12 : 0.06)};
  filter: blur(30px);
  pointer-events: none;
`;

const TableWrap = styled.div`
  padding: 20px 24px;
  flex: 1;
  animation: ${fadeUp} 0.4s ease both;
`;
