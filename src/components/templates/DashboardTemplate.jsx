import styled, { keyframes } from "styled-components";
import { Header } from "../organismos/Header";
import { useState } from "react";
import { BtnDesplegable } from "../moleculas/BtnDesplegable";
import { ListaMenuDesplegable } from "../moleculas/ListaMenuDesplegable";
import { useOperaciones } from "../../store/OperacionesStore";
import { DataDesplegableMovimientos } from "../../utils/dataEstatica";
import { CalendarioLineal } from "../organismos/CalendarioLineal";
import dayjs from "dayjs";
import { useMovimientosStore } from "../../store/MovimientosStore";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { useRegistroControls } from "../../hooks/useRegistroControls.jsx.jsx";
import { useReporteMovimientosQuery } from "../../queries/useReporteMovimientosQuery.jsx";
import { RadarGrafica } from "../organismos/graficas/Radar.jsx";
import { useDashboardGrafica } from "../../hooks/useDashboardGrafica.jsx";
import { SkeletonGrafica } from "../moleculas/SkeletonGrafica.jsx";

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

// ─── Component ────────────────────────────────────────────────
export function DashboardTemplate() {
  const [value, setValue] = useState(dayjs(Date.now()));
  const [formatoFecha, setFormatoFecha] = useState("");

  const { id_usuario } = useUsuariosStore();
  const { dataRptMovimientosAñoMes } = useMovimientosStore();

  const {
    setTipo,
    colorCategoria,
    bgCategoria,
    tituloBtnDesMovimientos,
    año,
    mes,
    tipo,
  } = useOperaciones();

  const {
    cerrarDesplegables,
    state,
    openUser,
    openTipo,
    stateTipo,
    cambiarTipo,
  } = useRegistroControls({ setTipo });

  const { isLoading } = useReporteMovimientosQuery({
    año,
    mes,
    tipo,
    id_usuario,
  });

  const { datagrafica } = useDashboardGrafica();

  return (
    <Container onClick={cerrarDesplegables}>
      {/* Ambient blobs */}
      <BgBlob className="blob-one" />
      <BgBlob className="blob-two" />

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

            <PageTitle>Dashboard</PageTitle>
          </ToolbarInner>
        </ToolbarGlass>
      </ToolbarRow>

      {/* ── Calendario ── */}
      <CalendarioSection>
        <CalendarioLineal
          value={value}
          setValue={setValue}
          formatoFecha={formatoFecha}
          setFormatoFecha={setFormatoFecha}
        />
      </CalendarioSection>

      {/* ── Gráfica Radar ── */}
      <MainSection>
        <ContentCard>
          <CardAccentBar color={bgCategoria} />
          <ChartWrap>
            {isLoading ? (
              <SkeletonGrafica bars={8} height="300px" />
            ) : (
              <RadarGrafica
                datagrafica={datagrafica}
                data={dataRptMovimientosAñoMes}
                titulo={tituloBtnDesMovimientos}
              />
            )}
          </ChartWrap>
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
  grid-template-rows: auto auto auto 1fr;
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

const ToolbarRow = styled.div`
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
  min-width: 160px;
  z-index: 101;
`;

const Divider = styled.div`
  width: 1px;
  height: 32px;
  background: rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
`;

const PageTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text || "#f0f0f8"};
  margin: 0;
  letter-spacing: -0.01em;
  opacity: 0.85;
`;

/* ── Calendario ── */

const CalendarioSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  position: relative;
  animation: ${fadeUp} 0.5s 0.1s ease both;
`;

/* ── Main ── */

const MainSection = styled.section`
  position: relative;
  z-index: 1;
  width: 100%;
  overflow-y: auto;
  padding-bottom: 20px;
  animation: ${fadeUp} 0.5s 0.15s ease both;

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

const ChartWrap = styled.div`
  padding: 24px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeUp} 0.4s ease both;
`;
