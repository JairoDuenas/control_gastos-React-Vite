import styled, { keyframes, css } from "styled-components";

/**
 * SkeletonGrafica
 * Skeleton universal para gráficas (dona, lineal, barras).
 * Usa metáfora de barras verticales + eje + leyenda.
 *
 * Props:
 *  - bars   {number}  cantidad de barras a simular (default: 7)
 *  - height {string}  altura del área de barras (default: "220px")
 */
export function SkeletonGrafica({ bars = 7, height = "220px" }) {
  // Alturas variadas para simular datos reales
  const barHeights = [55, 80, 40, 90, 65, 75, 50, 85, 45, 70];

  return (
    <Wrap>
      {/* Título y controles simulados */}
      <TopRow>
        <TitleBlock />
        <Controls>
          <PillBlock width="60px" />
          <PillBlock width="60px" delay="0.1s" />
          <PillBlock width="60px" delay="0.2s" />
        </Controls>
      </TopRow>

      {/* Área principal de la gráfica */}
      <ChartArea height={height}>
        {/* Líneas de cuadrícula horizontales */}
        <GridLines>
          {[0, 1, 2, 3].map((i) => (
            <GridLine key={i} />
          ))}
        </GridLines>

        {/* Barras */}
        <BarsRow>
          {Array.from({ length: bars }).map((_, i) => (
            <BarWrap key={i}>
              <Bar
                heightPercent={barHeights[i % barHeights.length]}
                delay={`${i * 0.07}s`}
              />
              <BarLabel delay={`${i * 0.07}s`} />
            </BarWrap>
          ))}
        </BarsRow>

        {/* Eje X */}
        <XAxis />
      </ChartArea>

      {/* Leyenda simulada */}
      <Legend>
        {[0, 1, 2].map((i) => (
          <LegendItem key={i} delay={`${i * 0.08}s`}>
            <LegendDot />
            <LegendText width={`${50 + i * 20}px`} />
          </LegendItem>
        ))}
      </Legend>
    </Wrap>
  );
}

// ─── Animations ───────────────────────────────────────────────

const shimmer = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
`;

const barGrow = keyframes`
  from { transform: scaleY(0); opacity: 0; }
  to   { transform: scaleY(1); opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

// ─── Shared shimmer mixin ──────────────────────────────────────
// Usa colores del tema para funcionar en modo claro y oscuro

const skeletonShimmer = css`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.skeletonBase   || "rgba(0,0,0,0.06)"} 25%,
    ${({ theme }) => theme.skeletonShine  || "rgba(0,0,0,0.12)"} 50%,
    ${({ theme }) => theme.skeletonBase   || "rgba(0,0,0,0.06)"} 75%
  );
  background-size: 600px 100%;
  animation: ${shimmer} 1.6s ease-in-out infinite;
`;

// ─── Styled Components ────────────────────────────────────────

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 4px 0;
`;

/* ── Top row ── */

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const TitleBlock = styled.div`
  height: 14px;
  width: 140px;
  border-radius: 99px;
  ${skeletonShimmer}
`;

const Controls = styled.div`
  display: flex;
  gap: 8px;
`;

const PillBlock = styled.div`
  height: 28px;
  width: ${({ width }) => width || "60px"};
  border-radius: 99px;
  ${skeletonShimmer}
  animation-delay: ${({ delay }) => delay || "0s"};
`;

/* ── Chart area ── */

const ChartArea = styled.div`
  position: relative;
  width: 100%;
  height: ${({ height }) => height || "220px"};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const GridLines = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 24px;
  pointer-events: none;
`;

const GridLine = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.skeletonBase || "rgba(0,0,0,0.06)"};
`;

const BarsRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  gap: 8px;
  width: 100%;
  height: calc(100% - 24px);
  padding: 0 8px;
  position: relative;
  z-index: 1;
`;

const BarWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  height: 100%;
`;

const Bar = styled.div`
  width: 100%;
  height: ${({ heightPercent }) => heightPercent}%;
  border-radius: 6px 6px 2px 2px;
  transform-origin: bottom;
  ${skeletonShimmer}
  animation:
    ${barGrow} 0.5s ${({ delay }) => delay || "0s"} ease both,
    ${shimmer} 1.6s ${({ delay }) => delay || "0s"} ease-in-out infinite;
`;

const BarLabel = styled.div`
  width: 60%;
  height: 8px;
  border-radius: 99px;
  flex-shrink: 0;
  ${skeletonShimmer}
  animation:
    ${fadeIn} 0.4s ${({ delay }) => delay || "0s"} ease both,
    ${shimmer} 1.6s ease-in-out infinite;
  opacity: 0.4;
`;

const XAxis = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.skeletonShine || "rgba(0,0,0,0.12)"};
  margin-top: 2px;
`;

/* ── Legend ── */

const Legend = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  animation: ${fadeIn} 0.4s ${({ delay }) => delay || "0s"} ease both;
`;

const LegendDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  ${skeletonShimmer}
`;

const LegendText = styled.div`
  height: 10px;
  width: ${({ width }) => width || "60px"};
  border-radius: 99px;
  ${skeletonShimmer}
`;
