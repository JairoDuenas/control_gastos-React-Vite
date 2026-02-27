import styled from "styled-components";
import { keyframes } from "styled-components";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/**
 * MainSection
 * Sección principal scrolleable usada en todos los templates.
 * Incluye scrollbar personalizado y animación de entrada.
 */
export const MainSection = styled.section`
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
