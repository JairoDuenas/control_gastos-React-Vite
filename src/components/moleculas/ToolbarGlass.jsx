import styled from "styled-components";
import { fadeUp, shimmerLine, slideIn } from "../../styles/animations";

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
