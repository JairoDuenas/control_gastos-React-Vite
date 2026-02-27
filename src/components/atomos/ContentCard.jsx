import styled from "styled-components";

/**
 * ContentCard
 * Card glassmorphism principal usada en todos los templates.
 * Incluye CardAccentBar en el borde superior con color dinámico.
 *
 * Uso:
 *  <ContentCard>
 *    <CardAccentBar color={bgCategoria} />
 *    ...contenido
 *  </ContentCard>
 */
export const ContentCard = styled.div`
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

/**
 * CardAccentBar
 * Barra de acento de 3px en el tope de ContentCard.
 * Toma el color dinámico según tipo ingreso/gasto.
 *
 * Props:
 *  - $color {string} color del gradiente (ej: bgCategoria)
 */
export const CardAccentBar = styled.div`
  height: 3px;
  width: 100%;
  background: ${({ $color }) =>
    $color
      ? `linear-gradient(90deg, ${$color}, transparent)`
      : "linear-gradient(90deg, #bf94ff, transparent)"};
  opacity: 0.8;
  flex-shrink: 0;
`;
