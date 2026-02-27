import { keyframes } from "styled-components";

// ─────────────────────────────────────────────────────────────
// animations.js
// Animaciones centralizadas del sistema de diseño.
// Importar solo las que se necesiten en cada archivo.
//
// Uso:
//   import { fadeUp, slideIn } from "../../styles/animations";
// ─────────────────────────────────────────────────────────────


// ── Entradas ─────────────────────────────────────────────────

/** Entrada desde abajo con fade. Usado en la mayoría de templates. */
export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/** Entrada desde abajo con scale. Usado en cards de totales. */
export const cardPop = keyframes`
  from { opacity: 0; transform: translateY(16px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

/** Entrada desde la izquierda. Usado en el Header. */
export const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
`;

/** Fade simple sin movimiento. Usado en SkeletonGrafica. */
export const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

/** Entrada desde la izquierda para filas de tabla. Usado en SkeletonTabla. */
export const fadeRowIn = keyframes`
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: translateX(0); }
`;


// ── Loops continuos ──────────────────────────────────────────

/** Flotación vertical suave. Usado en CarouselFrame y logo Login. */
export const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50%       { transform: translateY(-18px) rotate(2deg); }
`;

/** Flotación vertical simple sin rotación. Usado en EmptyState Lottie. */
export const emptyFloat = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
`;

/** Rotación lenta continua. Usado en anillos decorativos del Login. */
export const rotateSlow = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

/** Órbita circular. Usado en OrbitDot del avatar. */
export const orbitSpin = keyframes`
  from { transform: rotate(0deg) translateX(70px) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(70px) rotate(-360deg); }
`;


// ── Pulsos y brillos ─────────────────────────────────────────

/** Pulso de sombra morada. Usado en avatar del HomeTemplate. */
export const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(191, 148, 255, 0.4); }
  50%       { box-shadow: 0 0 0 14px rgba(191, 148, 255, 0); }
`;

/** Pulso de sombra configurable. Usado en avatar AcercaDe (color verde). */
export const avatarGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(26, 107, 69, 0.5); }
  50%       { box-shadow: 0 0 0 14px rgba(26, 107, 69, 0); }
`;

/** Expansión de anillo con fade. Usado en PulseRing del Login. */
export const pulseRing = keyframes`
  0%   { transform: scale(1);   opacity: 0.6; }
  100% { transform: scale(1.6); opacity: 0; }
`;


// ── Shimmer / loading ─────────────────────────────────────────

/**
 * Shimmer de barra de toolbar (horizontal, rango ±100%).
 * Usado en ShimmerLine de ToolbarGlass.
 */
export const shimmerLine = keyframes`
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

/**
 * Shimmer de fondo para skeletons (background-position).
 * Usado en SkeletonTabla y SkeletonGrafica.
 */
export const shimmer = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
`;

/**
 * Shimmer de fondo rango más corto. Usado en CardShimmer del Login.
 */
export const shimmerMove = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
`;


// ── Skeleton específico ───────────────────────────────────────

/** Crecimiento de barra desde la base. Usado en SkeletonGrafica. */
export const barGrow = keyframes`
  from { transform: scaleY(0); opacity: 0; }
  to   { transform: scaleY(1); opacity: 1; }
`;
