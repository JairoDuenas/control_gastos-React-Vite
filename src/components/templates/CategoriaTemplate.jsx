import styled, { keyframes } from "styled-components";
import { Header } from "../organismos/Header";
import { BtnDesplegable } from "../moleculas/BtnDesplegable";
import { useOperaciones } from "../../store/OperacionesStore";
import { ListaMenuDesplegable } from "../moleculas/ListaMenuDesplegable";
import { DataDesplegableTipo } from "../../utils/dataEstatica";
import { BtnFiltro } from "../moleculas/BtnFiltro";
import { v } from "../../styles/variables";
import { TablaCategorias } from "../../components/organismos/tablas/TablaCategorias";
import { RegistrarCategorias } from "../organismos/formularios/RegistrarCategorias";
import { LottieAnimacion } from "../moleculas/LottieAnimacion";
import vacioverde from "../../assets/vacioverde.json";
import vaciorojo from "../../assets/vaciorojo.json";
import { useRegistroControls } from "../../hooks/useRegistroControls.jsx";
import { FilterGlass } from "../atomos/FilterGlass.jsx";

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

const emptyFloat = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
`;

// ─── Component ────────────────────────────────────────────────
export function CategoriaTemplate({ data }) {
  const { colorCategoria, tituloBtnDes, bgCategoria, setTipo, tipo } =
    useOperaciones();

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

  return (
    <Container onClick={cerrarDesplegables}>
      {/* Ambient background blobs */}
      <BgBlob className="blob-one" />
      <BgBlob className="blob-two" />

      {openRegistro && (
        <RegistrarCategorias
          dataSelect={dataSelect}
          onClose={() => setOpenRegistro(!openRegistro)}
          accion={accion}
          state={openRegistro}
        />
      )}

      {/* ── Header ── */}
      <HeaderRow>
        <Header stateConfig={{ state: state, setState: openUser }} />
      </HeaderRow>

      {/* ── Toolbar ── */}
      <ToolbarRow>
        <ToolbarGlass>
          {/* Shimmer accent line */}
          <ShimmerLine />

          <ToolbarInner
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownWrap>
              <BtnDesplegable
                textcolor={colorCategoria}
                bgcolor={bgCategoria}
                text={tituloBtnDes}
                funcion={openTipo}
              />
              {stateTipo && (
                <ListaMenuDesplegable
                  data={DataDesplegableTipo}
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

      {/* ── Main Content ── */}
      <MainSection>
        <ContentCard>
          {/* Top accent bar */}
          <CardAccentBar color={bgCategoria} />

          {data.length === 0 ? (
            <EmptyState>
              <EmptyAnimWrapper>
                <LottieAnimacion
                  alto="260px"
                  ancho="260px"
                  animacion={tipo === "i" ? vacioverde : vaciorojo}
                />
              </EmptyAnimWrapper>
              <EmptyText>No hay categorías registradas aún</EmptyText>
              <EmptyHint>Usa el botón "+" para agregar una nueva</EmptyHint>
            </EmptyState>
          ) : (
            <TableWrap>
              <TablaCategorias
                data={data}
                setOpenRegistro={setOpenRegistro}
                setDataSelect={setDataSelect}
                setAccion={setAccion}
              />
            </TableWrap>
          )}
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
  grid-template-rows: auto auto 1fr;
  gap: 20px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  font-family: 'Sora', 'DM Sans', sans-serif;

  /* Blob helpers */
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
  animation: ${fadeUp} 0.5s 0.1s ease both;
`;

const ToolbarGlass = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 18px;
  backdrop-filter: blur(16px);
  overflow: visible; /* ← crítico: era hidden, bloqueaba el dropdown */
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
  z-index: 0;
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

/* ── Table ── */

const TableWrap = styled.div`
  padding: 20px 24px;
  flex: 1;
  animation: ${fadeUp} 0.4s ease both;
`;

/* ── Empty State ── */

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 40px 20px;
`;

const EmptyAnimWrapper = styled.div`
  animation: ${emptyFloat} 4s ease-in-out infinite;
`;

const EmptyText = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text || "#f0f0f8"};
  margin: 0;
  opacity: 0.8;
`;

const EmptyHint = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colorSubtitle || "#8888aa"};
  margin: 0;
`;
