import styled from "styled-components";
import { Carrusel } from "../moleculas/Carrusel";
import logojd from "../../assets/favicon.png";
import { BtnSave } from "../moleculas/BtnSave";
import { v } from "../../styles/variables";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

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
  CalendarioSection,
  ContentText,
  Title,
  SubText,
  AuthorCard,
  AvatarRing,
  OrbitDot,
  Actions,
  StatsRow,
  GradientSpan,
  BoxImage,
  CarouselFrame,
} from "../moleculas/ToolbarGlass";

// ─── Animations ───────────────────────────────────────────────

// ─── Component ────────────────────────────────────────────────
export function HomeTemplate() {
  return (
    <PageContainer>
      {/* Noise grain overlay */}
      <Grain />

      {/* Decorative grid lines */}
      <GridLines>
        {[...Array(6)].map((_, i) => (
          <GridLine key={i} $index={i} />
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
    </PageContainer>
  );
}

// ─── Styled Components ────────────────────────────────────────

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

/* ── Stats ── */

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
