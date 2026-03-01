import styled from "styled-components";
import {
  fadeUp,
  shimmerLine,
  shimmer,
  pulse,
  float,
  slideIn,
  avatarGlow,
  orbitSpin,
} from "../../styles/animations";

/**
 * ToolbarRow
 * Fila contenedora del toolbar con z-index y animación de entrada.
 */
export const ToolbarRow = styled.div`
  z-index: 300;
  position: relative;
  animation: ${fadeUp} 0.5s 0.05s ease both;
`;

/**
 * HeaderRow
 * Fila del header con z-index alto para que sus desplegables
 * se superpongan a todo el contenido inferior.
 */
export const HeaderRow = styled.header`
  display: flex;
  align-items: center;
  z-index: 999;
  position: relative;
  animation: ${slideIn} 0.5s ease both;
`;

/**
 * ToolbarGlass
 * Contenedor glassmorphism del toolbar.
 * overflow: visible es crítico para que los dropdowns no se recorten.
 */
export const ToolbarGlass = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 18px;
  backdrop-filter: blur(16px);
  overflow: visible;
  padding: 4px 8px;
`;

/**
 * ShimmerLine
 * Línea animada en el borde superior del ToolbarGlass.
 */
export const ShimmerLine = styled.div`
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

/**
 * ToolbarInner
 * Fila flex interna del toolbar con padding y gap.
 */
export const ToolbarInner = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 10px;
  flex-wrap: wrap;
`;

/**
 * DropdownWrap
 * Contenedor del BtnDesplegable con z-index alto
 * para que ListaMenuDesplegable se superponga a todo.
 */
export const DropdownWrap = styled.div`
  position: relative;
  flex: 1;
  min-width: 160px;
  z-index: 101;
`;

/**
 * ToolbarDivider
 * Separador vertical entre elementos del toolbar.
 */
export const ToolbarDivider = styled.div`
  width: 1px;
  height: 32px;
  background: rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
`;

/**
 * PageTitle
 * Título de página dentro del toolbar.
 */
export const PageTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text || "#f0f0f8"};
  margin: 0;
  letter-spacing: -0.01em;
  opacity: 0.85;
`;

/**
 * Calendario
 * Calendario dentro del toolbar.
 */
export const CalendarioSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  position: relative;
  animation: ${fadeUp} 0.5s 0.1s ease both;
`;

/**
 * Para tabs
 * Tabs dentro del toolbar.
 */
export const TabsWrap = styled.div`
  padding: 20px 24px;
  flex: 1;
  animation: ${fadeUp} 0.4s ease both;
`;

export const ChartWrap = styled.div`
  padding: 24px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeUp} 0.4s ease both;
`;

/**
 * Para AcercadeTemplate
 *
 */
export const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  padding: 48px 24px 40px;
  background: rgba(255, 255, 255, 0.025);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.03),
    0 24px 48px rgba(0, 0, 0, 0.2);
  animation: ${fadeUp} 0.6s ease both;

  @media (max-width: 480px) {
    padding: 32px 16px 28px;
  }
`;

export const AvatarWrap = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 4px;
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(26, 107, 69, 0.7);
  padding: 3px;
  animation: ${avatarGlow} 3s ease-in-out infinite;
`;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  animation: ${fadeUp} 0.6s 0.1s ease both;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const StatCard = styled.div`
  position: relative;
  text-align: center;
  padding: 28px 16px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px);
  overflow: hidden;
  animation: ${fadeUp} 0.5s ${({ $delay }) => $delay || "0s"} ease both;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(26, 107, 69, 0.25);
  }
`;

export const Section = styled.div`
  background: rgba(255, 255, 255, 0.025);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  padding: 28px;
  animation: ${fadeUp} 0.5s ${({ $delay }) => $delay || "0s"} ease both;

  @media (max-width: 480px) {
    padding: 20px 16px;
  }
`;

export const TechCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 18px 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: default;
  animation: ${fadeUp} 0.4s ${({ $delay }) => $delay || "0s"} ease both;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(26, 107, 69, 0.3);
    background: rgba(26, 107, 69, 0.06);
  }
`;

export const TimelineItem = styled.div`
  position: relative;
  padding-bottom: 28px;
  animation: ${fadeUp} 0.4s ${({ $delay }) => $delay || "0s"} ease both;

  &:last-child {
    padding-bottom: 0;
  }
`;

/**
 * Para ConfiguracionTemplate
 *
 */
/* ── Title ── */

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  animation: ${fadeUp} 0.5s ease both;
`;

/* ── Settings card ── */

export const SettingsCard = styled.div`
  position: relative;
  z-index: auto;
  background: rgba(255, 255, 255, 0.025);
  border-radius: 20px;
  border: 1px solid
    ${({ $danger }) =>
      $danger ? "rgba(255, 80, 80, 0.15)" : "rgba(255, 255, 255, 0.06)"};
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.03),
    0 16px 40px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  overflow: visible;
  display: flex;
  flex-direction: column;
  gap: 0;
  animation: ${fadeUp} 0.5s ${({ $delay }) => $delay || "0s"} ease both;
`;

/**
 * Para ConfiguracionTemplate
 *
 */

/* ── Content ── */

export const ContentText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  animation: ${fadeUp} 0.7s ease both;
`;

export const Title = styled.h1`
  font-size: clamp(2.4rem, 5.5vw, 4rem);
  font-weight: 800;
  line-height: 1.08;
  color: ${({ theme }) => theme.text || "#f0f0f8"};
  margin: 0;
  letter-spacing: -0.02em;
  animation: ${fadeUp} 0.7s 0.1s ease both;
`;

export const GradientSpan = styled.span`
  display: block;
  background: linear-gradient(135deg, #bf94ff 0%, #38bdf8 50%, #ffd700 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 4s linear infinite;
`;

export const SubText = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colorSubtitle || "#8888aa"};
  max-width: 500px;
  line-height: 1.7;
  margin: 0;
  animation: ${fadeUp} 0.7s 0.2s ease both;

  @media (max-width: 1024px) {
    margin: 0 auto;
  }
`;

/* ── Author ── */

export const AuthorCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: fit-content;
  padding: 12px 18px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  animation: ${fadeUp} 0.7s 0.3s ease both;

  @media (max-width: 1024px) {
    margin: 0 auto;
  }
`;

export const AvatarRing = styled.div`
  position: relative;
  width: 52px;
  height: 52px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(191, 148, 255, 0.6);
    padding: 2px;
    animation: ${pulse} 2.5s ease-in-out infinite;
  }
`;

export const OrbitDot = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 8px;
  height: 8px;
  background: #38bdf8;
  border-radius: 50%;
  box-shadow: 0 0 8px #38bdf8;
  animation: ${orbitSpin} 3s linear infinite;
  transform-origin: center 26px;
`;

/* ── Actions ── */

export const Actions = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.7s 0.4s ease both;

  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

export const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 18px 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  width: fit-content;
  backdrop-filter: blur(12px);
  animation: ${fadeUp} 0.7s 0.5s ease both;

  @media (max-width: 1024px) {
    margin: 0 auto;
  }
`;

/* ── Carousel ── */

export const BoxImage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeUp} 0.7s 0.15s ease both;

  @media (max-width: 1024px) {
    grid-row: 1;
  }
`;

export const CarouselFrame = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  padding: 24px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(20px);
  animation: ${float} 6s ease-in-out infinite;

  @media (max-width: 1024px) {
    max-width: 300px;
    padding: 16px;
  }
`;
