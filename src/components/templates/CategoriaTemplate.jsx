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
} from "../moleculas/ToolbarGlass";
import { fadeUp } from "../../styles/animations.jsx";

// ─── Animations ───────────────────────────────────────────────

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
    <PageContainer onClick={cerrarDesplegables}>
      <BgBlobs />

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
          <ShimmerLine />
          <ToolbarInner onClick={(e) => e.stopPropagation()}>
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

      {/* ── Main Content ── */}
      <MainSection>
        <ContentCard>
          <CardAccentBar $color={bgCategoria} />

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
    </PageContainer>
  );
}

// ─── Local Styled Components ──────────────────────────────────
// Solo los que son exclusivos de este template

const TableWrap = styled.div`
  padding: 20px 24px;
  flex: 1;
  animation: ${fadeUp} 0.4s ease both;
`;

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
