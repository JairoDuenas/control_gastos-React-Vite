import styled, { keyframes } from "styled-components";
import { Header } from "../organismos/Header";
import { useRegistroControls } from "../../hooks/useRegistroControls.jsx";
import { useOperaciones } from "../../store/OperacionesStore.jsx";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import imgFoto from "../../assets/foto.png";

// ─── Animations ───────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const avatarGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(26, 107, 69, 0.5); }
  50%       { box-shadow: 0 0 0 14px rgba(26, 107, 69, 0); }
`;

const orbitSpin = keyframes`
  from { transform: rotate(0deg) translateX(70px) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(70px) rotate(-360deg); }
`;

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
    <Container onClick={cerrarDesplegables}>
      {/* Ambient blobs */}
      <BgBlob className="blob-one" />
      <BgBlob className="blob-two" />
      <BgBlob className="blob-three" />

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
    </Container>
  );
}

// ─── Styled Components ────────────────────────────────────────

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: ${({ theme }) => theme.bgtotal || "#0a0a0f"};
  color: ${({ theme }) => theme.text || "#f0f0f8"};
  box-sizing: border-box;
  overflow-x: hidden;
  font-family: "Sora", "DM Sans", sans-serif;

  .blob-one {
    top: -180px;
    left: -120px;
    background: radial-gradient(
      circle,
      rgba(26, 107, 69, 0.18) 0%,
      transparent 70%
    );
  }
  .blob-two {
    bottom: -160px;
    right: -80px;
    background: radial-gradient(
      circle,
      rgba(42, 157, 111, 0.12) 0%,
      transparent 70%
    );
    width: 420px;
    height: 420px;
  }
  .blob-three {
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 300px;
    background: radial-gradient(
      circle,
      rgba(26, 107, 69, 0.07) 0%,
      transparent 70%
    );
  }

  @media (max-width: 480px) {
    padding: 14px;
    padding-bottom: 40px;
  }
`;

const BgBlob = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(50px);
  pointer-events: none;
  z-index: 0;
`;

const ParticlesWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`;

/* ── Header ── */

const HeaderRow = styled.div`
  position: relative;
  z-index: 200;
  width: 100%;
  animation: ${slideIn} 0.5s ease both;
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

const Hero = styled.div`
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

const AvatarWrap = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 4px;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(26, 107, 69, 0.7);
  padding: 3px;
  animation: ${avatarGlow} 3s ease-in-out infinite;
`;

const OrbitDot = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 10px;
  height: 10px;
  background: #2a9d6f;
  border-radius: 50%;
  box-shadow: 0 0 10px #2a9d6f;
  animation: ${orbitSpin} 3.5s linear infinite;
  transform-origin: center 60px;
`;

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

/* ── Stats ── */

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  animation: ${fadeUp} 0.6s 0.1s ease both;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const StatCard = styled.div`
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

/* ── Section ── */

const Section = styled.div`
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

const TechCard = styled.div`
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

const TimelineItem = styled.div`
  position: relative;
  padding-bottom: 28px;
  animation: ${fadeUp} 0.4s ${({ $delay }) => $delay || "0s"} ease both;

  &:last-child {
    padding-bottom: 0;
  }
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
