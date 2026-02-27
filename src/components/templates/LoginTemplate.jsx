import styled, { keyframes } from "styled-components";
import { BtnSave } from "../moleculas/BtnSave";
import { v } from "../../styles/variables";
import { useAuthStore } from "../../store/AuthStore";
import { Device } from "../../styles/breakPoins";

// ─── Animations ───────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-12px); }
`;

const shimmerMove = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
`;

const rotateSlow = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const pulseRing = keyframes`
  0%   { transform: scale(1);   opacity: 0.6; }
  100% { transform: scale(1.6); opacity: 0; }
`;

// ─── Component ────────────────────────────────────────────────
export function LoginTemplate() {
  const { signInWithGoogle } = useAuthStore();

  return (
    <Container $imgfondo={v.imagenfondo}>
      {/* Grain overlay */}
      <Grain />

      {/* Decorative blobs */}
      <Blob1 />
      <Blob2 />
      <Blob3 />

      {/* Rotating ring decoration */}
      <RingOuter />
      <RingInner />

      <Card>
        {/* Top shimmer line */}
        <CardShimmer />

        {/* Version badge */}
        <VersionBadge>v 1.0</VersionBadge>

        {/* Logo */}
        <LogoWrap>
          <PulseRing />
          <LogoImg src={v.logo} alt="Logo" />
        </LogoWrap>

        {/* Title */}
        <TitleBlock>
          <Title>Control Gastos</Title>
          <Subtitle>Toma el control de tus 💵 gastos e 💰 ingresos</Subtitle>
        </TitleBlock>

        {/* Divider */}
        <Divider />

        {/* CTA */}
        <BtnWrap>
          <BtnSave
            titulo="Iniciar con Google"
            icono={<v.iconogoogle />}
            bgcolor={v.colorSecundario}
            funcion={signInWithGoogle}
          />
        </BtnWrap>

        <FooterNote>
          Al continuar aceptas nuestros términos de uso
        </FooterNote>
      </Card>
    </Container>
  );
}

// ─── Styled Components ────────────────────────────────────────

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${({ $imgfondo }) => $imgfondo});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  font-family: 'Sora', 'DM Sans', sans-serif;

  /* Dark overlay sobre la imagen de fondo */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(6, 6, 14, 0.72);
    z-index: 0;
  }
`;

/* ── Grain ── */

const Grain = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.035;
`;

/* ── Blobs ── */

const Blob1 = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  top: -160px;
  left: -140px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(191, 148, 255, 0.18) 0%, transparent 70%);
  filter: blur(50px);
  z-index: 1;
  pointer-events: none;
`;

const Blob2 = styled.div`
  position: absolute;
  width: 420px;
  height: 420px;
  bottom: -120px;
  right: -100px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.14) 0%, transparent 70%);
  filter: blur(50px);
  z-index: 1;
  pointer-events: none;
`;

const Blob3 = styled.div`
  position: absolute;
  width: 260px;
  height: 260px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 180, 0, 0.07) 0%, transparent 70%);
  filter: blur(40px);
  z-index: 1;
  pointer-events: none;
`;

/* ── Decorative rings ── */

const RingOuter = styled.div`
  position: absolute;
  width: 700px;
  height: 700px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.04);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${rotateSlow} 40s linear infinite;
  z-index: 1;
  pointer-events: none;
`;

const RingInner = styled.div`
  position: absolute;
  width: 480px;
  height: 480px;
  border-radius: 50%;
  border: 1px solid rgba(191, 148, 255, 0.07);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${rotateSlow} 25s linear infinite reverse;
  z-index: 1;
  pointer-events: none;
`;

/* ── Card ── */

const Card = styled.div`
  position: relative;
  z-index: 2;
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 36px 32px 28px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.03),
    0 32px 64px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  overflow: hidden;
  animation: ${fadeUp} 0.7s ease both;

  @media (max-width: 400px) {
    padding: 28px 20px 22px;
  }
`;

const CardShimmer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(191, 148, 255, 0.8) 50%,
    transparent 100%
  );
  background-size: 600px 100%;
  animation: ${shimmerMove} 3s ease-in-out infinite;
`;

/* ── Version badge ── */

const VersionBadge = styled.span`
  align-self: flex-start;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 999px;
  padding: 3px 10px;
  animation: ${fadeUp} 0.5s 0.1s ease both;
`;

/* ── Logo ── */

const LogoWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeUp} 0.5s 0.15s ease both;
`;

const PulseRing = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid rgba(191, 148, 255, 0.4);
  animation: ${pulseRing} 2.5s ease-out infinite;
`;

const LogoImg = styled.img`
  max-width: 80px;
  animation: ${float} 4s ease-in-out infinite;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 0 16px rgba(191, 148, 255, 0.3));
`;

/* ── Title block ── */

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  animation: ${fadeUp} 0.5s 0.2s ease both;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.03em;
  color: #ffffff;
`;

const Subtitle = styled.p`
  font-size: 0.88rem;
  margin: 0;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.45);
  max-width: 280px;
`;

/* ── Divider ── */

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.08),
    transparent
  );
  animation: ${fadeUp} 0.5s 0.25s ease both;
`;

/* ── Button ── */

const BtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  animation: ${fadeUp} 0.5s 0.3s ease both;
`;

/* ── Footer note ── */

const FooterNote = styled.p`
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.2);
  margin: 0;
  text-align: center;
  animation: ${fadeUp} 0.5s 0.35s ease both;
`;
