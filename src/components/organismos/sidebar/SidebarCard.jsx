import styled from "styled-components";
import { v } from "../../../styles/variables";

// ─── Animations ────────────────────────────────────────────────
import { shimmerMove, pulse } from "../../../styles/animations";

export function SidebarCard() {
  return (
    <Container>
      <IconWrap>
        <v.iconoayuda />
      </IconWrap>

      <CardBody>
        <ShimmerBar />
        <GlowOrb />
        <CardTitle>Centro de ayuda</CardTitle>
        <CardHint>¿Tienes alguna duda?</CardHint>
        <ContactBtn href="mailto:soporte@app.com">Contactar</ContactBtn>
      </CardBody>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 0 8px 16px;
  box-sizing: border-box;
  position: relative;
`;

const IconWrap = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  margin-bottom: -16px;

  svg {
    font-size: 2rem;
    color: #bf94ff;
    animation: ${pulse} 2.8s ease-in-out infinite;
  }
`;

const CardBody = styled.div`
  position: relative;
  z-index: 1;
  background: rgba(191, 148, 255, 0.05);
  border: 1px solid rgba(191, 148, 255, 0.15);
  border-radius: 16px;
  padding: 26px 14px 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  overflow: hidden;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 8px 24px rgba(0, 0, 0, 0.25);
`;

const ShimmerBar = styled.div`
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
  background-size: 300px 100%;
  animation: ${shimmerMove} 2.5s ease-in-out infinite;
`;

const GlowOrb = styled.div`
  position: absolute;
  bottom: -40px;
  right: -30px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(191, 148, 255, 0.15) 0%,
    transparent 70%
  );
  filter: blur(16px);
  pointer-events: none;
`;

const CardTitle = styled.h3`
  font-size: 0.82rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text || "#f0f0f8"};
  margin: 0;
  letter-spacing: 0.01em;
`;

const CardHint = styled.span`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colorSubtitle || "#8888aa"};
  margin-bottom: 8px;
`;

const ContactBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #bf94ff;
  background: rgba(191, 148, 255, 0.1);
  border: 1px solid rgba(191, 148, 255, 0.25);
  border-radius: 999px;
  padding: 6px 18px;
  text-decoration: none;
  transition:
    background 0.2s,
    border-color 0.2s,
    transform 0.2s;

  &:hover {
    background: rgba(191, 148, 255, 0.18);
    border-color: rgba(191, 148, 255, 0.45);
    transform: translateY(-1px);
  }
`;
