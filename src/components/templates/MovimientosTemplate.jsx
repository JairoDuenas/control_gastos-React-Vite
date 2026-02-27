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
import { SpinnerLoader } from "../moleculas/Spinner.jsx";

// ─── Animations ───────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const shimmerLine = keyframes`
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const cardPop = keyframes`
  from { opacity: 0; transform: translateY(16px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

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
    <Container onClick={cerrarDesplegables}>
      {/* Ambient blobs */}
      <BgBlob className="blob-one" />
      <BgBlob className="blob-two" />

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

            <Divider />

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
    </Container>
  );
}

// ─── Styled Components ────────────────────────────────────────

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  background: ${({ theme }) => theme.bgtotal || "#0a0a0f"};
  color: ${({ theme }) => theme.text || "#f0f0f8"};
  display: grid;
  grid-template-rows: auto auto auto auto 1fr;
  gap: 20px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  font-family: 'Sora', 'DM Sans', sans-serif;

  .blob-one {
    top: -180px;
    left: -120px;
    background: radial-gradient(circle, rgba(155, 109, 255, 0.14) 0%, transparent 70%);
  }
  .blob-two {
    bottom: -160px;
    right: -80px;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.10) 0%, transparent 70%);
    width: 420px;
    height: 420px;
  }
`;

const BgBlob = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(50px);
  pointer-events: none;
  z-index: 0;
`;

/* ── Header ── */

const HeaderRow = styled.header`
  display: flex;
  align-items: center;
  z-index: 200;
  position: relative;
  animation: ${slideIn} 0.5s ease both;
`;

/* ── Toolbar ── */

const ToolbarRow = styled.section`
  z-index: 100;
  position: relative;
  animation: ${fadeUp} 0.5s 0.05s ease both;
`;

const ToolbarGlass = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 18px;
  backdrop-filter: blur(16px);
  overflow: visible;
  padding: 4px 8px;
`;

const ShimmerLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  border-radius: 18px 18px 0 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(191, 148, 255, 0.6) 50%,
    transparent 100%
  );
  animation: ${shimmerLine} 3s ease-in-out infinite;
  pointer-events: none;
`;

const ToolbarInner = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 10px;
  flex-wrap: wrap;
`;

const DropdownWrap = styled.div`
  position: relative;
  flex: 1;
  min-width: 160px;
  z-index: 101;
`;

const Divider = styled.div`
  width: 1px;
  height: 32px;
  background: rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
`;

/* ── Totales ── */

const TotalesGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
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
  padding: 16px 20px;
  border-radius: 18px;
  background: ${({ highlight }) =>
    highlight ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.025)"};
  border: 1px solid ${({ highlight }) =>
    highlight ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)"};
  backdrop-filter: blur(16px);
  overflow: hidden;
  animation: ${cardPop} 0.5s ${({ delay }) => delay || "0s"} ease both;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(255,255,255,0.14);
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

/* ── Calendario ── */

const CalendarioSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  position: relative;
  animation: ${fadeUp} 0.5s 0.15s ease both;
`;

/* ── Main ── */

const MainSection = styled.section`
  position: relative;
  z-index: 1;
  width: 100%;
  overflow-y: auto;
  padding-bottom: 20px;
  animation: ${fadeUp} 0.5s 0.2s ease both;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(191, 148, 255, 0.3);
    border-radius: 99px;
  }
`;

const ContentCard = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.025);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.03),
    0 24px 48px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  min-height: 420px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CardAccentBar = styled.div`
  height: 3px;
  width: 100%;
  background: ${({ color }) =>
    color
      ? `linear-gradient(90deg, ${color}, transparent)`
      : "linear-gradient(90deg, #bf94ff, transparent)"};
  opacity: 0.8;
  flex-shrink: 0;
`;

const TableWrap = styled.div`
  padding: 20px 24px;
  flex: 1;
  animation: ${fadeUp} 0.4s ease both;
`;
