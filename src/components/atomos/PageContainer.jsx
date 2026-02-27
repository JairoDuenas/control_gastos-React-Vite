import styled from "styled-components";

/**
 * PageContainer
 * Contenedor base para todos los templates.
 * Maneja el fondo, padding, overflow y font-family del sistema.
 *
 * Props:
 *  - $rows {string} grid-template-rows (default: "auto auto 1fr")
 */
export const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  background: ${({ theme }) => theme.bgtotal || "#0a0a0f"};
  color: ${({ theme }) => theme.text || "#f0f0f8"};
  display: grid;
  grid-template-rows: ${({ $rows }) => $rows || "auto auto 1fr"};
  gap: 20px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  font-family: 'Sora', 'DM Sans', sans-serif;

  @media (max-width: 480px) {
    padding: 14px;
    gap: 14px;
  }
`;
