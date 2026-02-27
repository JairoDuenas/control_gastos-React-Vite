import styled, { keyframes } from "styled-components";
import { Carrusel } from "../moleculas/Carrusel";
import logojd from "../../assets/favicon.png";
import { BtnSave } from "../moleculas/BtnSave";
import { v } from "../../styles/variables";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// ─── Animations ───────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50%       { transform: translateY(-18px) rotate(2deg); }
`;

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const orbitSpin = keyframes`
  from { transform: rotate(0deg) translateX(140px) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(140px) rotate(-360deg); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(191, 148, 255, 0.4); }
  50%       { box-shadow: 0 0 0 14px rgba(191, 148, 255, 0); }
`;

// ─── Component ────────────────────────────────────────────────
export function HomeTemplate() {
  return (
    <Main>
      {/* Noise grain overlay */}
      <Grain />

      {/* Decorative grid lines */}
      <GridLines>
        {[...Array(6)].map((_, i) => (
          <GridLine key={i} index={i} />
        ))}
      </GridLines>

      {/* Ambient blobs */}
      <BlobField>
        <Blob1 />
        <Blob2 />
        <Blob3 />
      </BlobField>

      <Container>
        <HeroSection>
          {/* ── Left Column ── */}
          <ContentText>
            <EyebrowTag>💡 Finanzas inteligentes</EyebrowTag>

            <Title>
              Controla tus gastos
              <GradientSpan> con inteligencia 💵</GradientSpan>
            </Title>

            <SubText>
              Gestiona tus finanzas de forma intuitiva y moderna. Gracias por
              ser parte del cambio en el control de gastos.
            </SubText>

            <AuthorCard>
              <AvatarRing>
                <img src={logojd} alt="Jairo Dueñas" />
                <OrbitDot />
              </AvatarRing>
              <AuthorInfo>
                <AuthorName>Jairo Dueñas</AuthorName>
                <AuthorQuote>"Todos podemos programar"</AuthorQuote>
              </AuthorInfo>
            </AuthorCard>

            <Actions>
              <BtnSave
                titulo="Telegram Comunitario"
                bgcolor="linear-gradient(135deg, #bf94ff, #9b6dff)"
                icono={<v.iconoreact />}
              />
              <BtnSave
                titulo="Premium Access"
                bgcolor="linear-gradient(135deg, #ffd700, #ff9900)"
                icono={<v.iconocorona />}
              />
            </Actions>

            {/* Stats row */}
            <StatsRow>
              <Stat>
                <StatNum>12K+</StatNum>
                <StatLabel>Usuarios</StatLabel>
              </Stat>
              <StatDivider />
              <Stat>
                <StatNum>98%</StatNum>
                <StatLabel>Satisfacción</StatLabel>
              </Stat>
              <StatDivider />
              <Stat>
                <StatNum>4.9★</StatNum>
                <StatLabel>Valoración</StatLabel>
              </Stat>
            </StatsRow>
          </ContentText>

          {/* ── Right Column ── */}
          <BoxImage>
            <CarouselFrame>
              <FrameGlow />
              <Carrusel />
            </CarouselFrame>
          </BoxImage>
        </HeroSection>
      </Container>
    </Main>
  );
}

// ─── Styled Components ────────────────────────────────────────

const Main = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  background: ${({ theme }) => theme.bgtotal || "#0a0a0f"};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  font-family: "Sora", "DM Sans", sans-serif;
`;

/* ── Background layers ── */

const Grain = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  opacity: 0.03;
`;

const GridLines = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`;

const GridLine = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ index }) => (index / 5) * 100}%;
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(191, 148, 255, 0.06),
    transparent
  );
`;

const BlobField = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`;

const Blob1 = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  top: -200px;
  left: -150px;
  background: radial-gradient(
    circle,
    rgba(155, 109, 255, 0.18) 0%,
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(40px);
`;

const Blob2 = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  bottom: -180px;
  right: -100px;
  background: radial-gradient(
    circle,
    rgba(56, 189, 248, 0.14) 0%,
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(40px);
`;

const Blob3 = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    rgba(255, 180, 0, 0.05) 0%,
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(60px);
`;

/* ── Layout ── */

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  z-index: 2;
  position: relative;
`;

const HeroSection = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 64px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 48px;
  }
`;

/* ── Content ── */

const ContentText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  animation: ${fadeUp} 0.7s ease both;
`;

const EyebrowTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #bf94ff;
  background: rgba(191, 148, 255, 0.1);
  border: 1px solid rgba(191, 148, 255, 0.2);
  border-radius: 999px;
  padding: 6px 14px;
  width: fit-content;
  backdrop-filter: blur(8px);

  @media (max-width: 1024px) {
    margin: 0 auto;
  }
`;

const Title = styled.h1`
  font-size: clamp(2.4rem, 5.5vw, 4rem);
  font-weight: 800;
  line-height: 1.08;
  color: ${({ theme }) => theme.text || "#f0f0f8"};
  margin: 0;
  letter-spacing: -0.02em;
  animation: ${fadeUp} 0.7s 0.1s ease both;
`;

const GradientSpan = styled.span`
  display: block;
  background: linear-gradient(135deg, #bf94ff 0%, #38bdf8 50%, #ffd700 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 4s linear infinite;
`;

const SubText = styled.p`
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

const AuthorCard = styled.div`
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

const AvatarRing = styled.div`
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

const OrbitDot = styled.div`
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

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  text-align: left;
`;

const AuthorName = styled.b`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text || "#f0f0f8"};
`;

const AuthorQuote = styled.span`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colorSubtitle || "#8888aa"};
  font-style: italic;
`;

/* ── Actions ── */

const Actions = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.7s 0.4s ease both;

  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

/* ── Stats ── */

const StatsRow = styled.div`
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

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const StatNum = styled.span`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text || "#f0f0f8"};
  letter-spacing: -0.02em;
`;

const StatLabel = styled.span`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colorSubtitle || "#8888aa"};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const StatDivider = styled.div`
  width: 1px;
  height: 32px;
  background: rgba(255, 255, 255, 0.08);
`;

/* ── Carousel ── */

const BoxImage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeUp} 0.7s 0.15s ease both;

  @media (max-width: 1024px) {
    grid-row: 1;
  }
`;

const CarouselFrame = styled.div`
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

const FrameGlow = styled.div`
  position: absolute;
  inset: -1px;
  border-radius: 28px;
  background: linear-gradient(
    135deg,
    rgba(191, 148, 255, 0.25),
    rgba(56, 189, 248, 0.15),
    transparent 60%
  );
  z-index: -1;
  pointer-events: none;
`;
