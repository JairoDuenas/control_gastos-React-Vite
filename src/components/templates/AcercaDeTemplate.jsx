import styled from "styled-components";
import { Header } from "../organismos/Header";
import { useRegistroControls } from "../../hooks/useRegistroControls.jsx";
import { useOperaciones } from "../../store/OperacionesStore.jsx";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import imgFoto from "../../assets/foto.png";

// ─── Shared components ────────────────────────────────────────
import { BgBlobs } from "../atomos/BgBlobs";
import { PageContainer } from "../atomos/PageContainer";
import {
  HeaderRow,
  Hero,
  Avatar,
  AvatarWrap,
  OrbitDot,
  Stats,
  StatCard,
  Section,
  TechCard,
  TimelineItem,
} from "../moleculas/ToolbarGlass";

// ─── Animations ───────────────────────────────────────────────

// ─── Component ────────────────────────────────────────────────
export function AcercaDeTemplate() {
  const { setTipo } = useOperaciones();
  const { cerrarDesplegables, state, openUser } = useRegistroControls({
    setTipo,
  });

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <PageContainer onClick={cerrarDesplegables}>
      {/* Ambient blobs */}
      <BgBlobs />

      {/* Partículas */}
      <ParticlesWrapper>
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: "transparent" },
            particles: {
              number: { value: 40 },
              size: { value: 2 },
              move: { speed: 0.8 },
              opacity: { value: 0.2 },
              color: { value: "#bf94ff" },
            },
          }}
        />
      </ParticlesWrapper>

      {/* ── Header ── */}
      <HeaderRow>
        <Header stateConfig={{ state: state, setState: openUser }} />
      </HeaderRow>

      {/* ── Content ── */}
      <Content
        as={motion.div}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* ── Hero ── */}
        <Hero>
          <AvatarWrap>
            <Avatar src={imgFoto} alt="Jairo Dueñas" />
            <OrbitDot />
          </AvatarWrap>

          <HeroName>Jairo Dueñas</HeroName>
          <HeroBadge>Frontend Developer · Dashboard Fintech</HeroBadge>
          <HeroDesc>
            Plataforma moderna para gestión financiera inteligente,
            visualización avanzada y arquitectura optimizada.
          </HeroDesc>
        </Hero>

        {/* ── Stats ── */}
        <Stats>
          {[
            { end: 100, suffix: "+", label: "Consultas Procesadas" },
            { end: 12, suffix: "", label: "Módulos del Sistema" },
            { end: 99, suffix: "%", label: "Optimización UI" },
          ].map((s, i) => (
            <StatCard key={i} $delay={`${i * 0.1}s`}>
              <StatGlow />
              <StatNum>
                <CountUp end={s.end} duration={2} />
                {s.suffix}
              </StatNum>
              <StatLabel>{s.label}</StatLabel>
            </StatCard>
          ))}
        </Stats>

        {/* ── Tecnologías ── */}
        <Section $delay="0.2s">
          <SectionTitle>Tecnologías Utilizadas</SectionTitle>
          <TechGrid>
            {[
              { name: "React", emoji: "⚛️" },
              { name: "Zustand", emoji: "🐻" },
              { name: "React Query", emoji: "🔄" },
              { name: "Styled Components", emoji: "💅" },
              { name: "Chart.js", emoji: "📊" },
              { name: "Framer Motion", emoji: "🎞️" },
            ].map((t, i) => (
              <TechCard key={i} $delay={`${i * 0.07}s`}>
                <TechEmoji>{t.emoji}</TechEmoji>
                <TechName>{t.name}</TechName>
              </TechCard>
            ))}
          </TechGrid>
        </Section>

        {/* ── Timeline ── */}
        <Section $delay="0.3s">
          <SectionTitle>Timeline del Proyecto</SectionTitle>
          <Timeline>
            {[
              { fase: "Inicio", desc: "Diseño base y arquitectura inicial." },
              {
                fase: "Optimización",
                desc: "Integración React Query y mejoras de rendimiento.",
              },
              {
                fase: "Visualización",
                desc: "Implementación de gráficas dinámicas.",
              },
              {
                fase: "Actualidad",
                desc: "Dashboard premium con animaciones modernas.",
              },
            ].map((item, i) => (
              <TimelineItem key={i} $delay={`${i * 0.1}s`}>
                <TimelineDot />
                <TimelineContent>
                  <TimelineFase>{item.fase}</TimelineFase>
                  <TimelineDesc>{item.desc}</TimelineDesc>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Section>
      </Content>
    </PageContainer>
  );
}

// ─── Styled Components ────────────────────────────────────────

const ParticlesWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`;

/* ── Content ── */

const Content = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

/* ── Hero ── */

const HeroName = styled.h1`
  font-size: clamp(1.8rem, 5vw, 2.8rem);
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.text || "#f0f0f8"};
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #1a6b45;
  background: rgba(26, 107, 69, 0.08);
  border: 1px solid rgba(26, 107, 69, 0.2);
  border-radius: 999px;
  padding: 5px 14px;
`;

const HeroDesc = styled.p`
  max-width: 540px;
  margin: 0 auto;
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colorSubtitle || "#8888aa"};
`;

const StatGlow = styled.div`
  position: absolute;
  bottom: -20px;
  right: -20px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(26, 107, 69, 0.15);
  filter: blur(20px);
  pointer-events: none;
`;

const StatNum = styled.h2`
  font-size: 2.2rem;
  font-weight: 800;
  margin: 0 0 6px;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.text || "#f0f0f8"};
`;

const StatLabel = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colorSubtitle || "#8888aa"};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 24px;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.text || "#f0f0f8"};
  text-align: center;

  &::after {
    content: "";
    display: block;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, #1a6b45, transparent);
    border-radius: 99px;
    margin: 8px auto 0;
  }
`;

/* ── Tech grid ── */

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 12px;
`;

const TechEmoji = styled.span`
  font-size: 1.6rem;
  line-height: 1;
`;

const TechName = styled.span`
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text || "#f0f0f8"};
  text-align: center;
`;

/* ── Timeline ── */

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  border-left: 2px solid rgba(26, 107, 69, 0.3);
  padding-left: 28px;
  margin-left: 8px;
`;

const TimelineDot = styled.div`
  position: absolute;
  left: -36px;
  top: 4px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a6b45, #2a9d6f);
  box-shadow: 0 0 10px rgba(26, 107, 69, 0.6);
  border: 2px solid ${({ theme }) => theme.bgtotal || "#0a0a0f"};
`;

const TimelineContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TimelineFase = styled.span`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text || "#f0f0f8"};
`;

const TimelineDesc = styled.p`
  font-size: 0.83rem;
  margin: 0;
  line-height: 1.6;
  color: ${({ theme }) => theme.colorSubtitle || "#8888aa"};
`;
