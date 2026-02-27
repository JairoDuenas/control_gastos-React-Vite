import styled, { keyframes } from "styled-components";
import { Header } from "../organismos/Header";
import { useState } from "react";
import { Selector } from "../organismos/Selector";
import { v } from "../../styles/variables";
import { ListaPaises } from "../organismos/ListaPaises";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { BtnSave } from "../moleculas/BtnSave";
import { CardEliminarData } from "../organismos/CardEliminarData";

// ─── Animations ───────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
`;



// ─── Component ────────────────────────────────────────────────
export function ConfiguracionTemplate() {
  const { datausuarios, editarMonedaUser } = useUsuariosStore();
  const [select, setSelect] = useState([]);
  const [state, setState] = useState(false);
  const [stateListaPaises, setStateListaPaises] = useState(false);

  const moneda = select.symbol ? select.symbol : datausuarios.moneda;
  const pais = select.countryName ? select.countryName : datausuarios.pais;
  const paisSeleccionado = "💵 " + moneda + " " + pais;

  const editar = async () => {
    await editarMonedaUser({
      moneda,
      pais,
      id: datausuarios.id,
    });
  };

  return (
    <Container>
      {/* Ambient blobs */}
      <BgBlob className="blob-one" />
      <BgBlob className="blob-two" />

      {/* ── Header ── */}
      <HeaderRow>
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </HeaderRow>

      {/* ── Content ── */}
      <ContentArea>

        {/* Page title */}
        <TitleRow>
          <TitleIcon>⚙️</TitleIcon>
          <div>
            <PageTitle>Ajustes</PageTitle>
            <PageSubtitle>Personaliza tu experiencia</PageSubtitle>
          </div>
        </TitleRow>

        {/* Moneda card */}
        <SettingsCard delay="0.1s">
          <CardAccentBar />
          <CardHeader>
            <CardIcon>💱</CardIcon>
            <CardInfo>
              <CardLabel>Moneda y país</CardLabel>
              <CardHint>Selecciona tu moneda local</CardHint>
            </CardInfo>
          </CardHeader>

          <SelectorRow>
            <Selector
              state={stateListaPaises}
              color={v.colorselector}
              texto1={paisSeleccionado}
              funcion={() => setStateListaPaises(!stateListaPaises)}
            />
            {stateListaPaises && (
              <ListaPaises
                setSelect={(p) => setSelect(p)}
                setState={() => setStateListaPaises(!stateListaPaises)}
              />
            )}
          </SelectorRow>

          <SaveRow>
            <BtnSave
              titulo="Guardar cambios"
              bgcolor={v.colorselector}
              icono={<v.iconoguardar />}
              funcion={editar}
            />
          </SaveRow>
        </SettingsCard>

        {/* Zona peligrosa */}
        <SettingsCard delay="0.2s" danger>
          <CardAccentBar danger />
          <CardHeader>
            <CardIcon>🗑️</CardIcon>
            <CardInfo>
              <CardLabel>Zona peligrosa</CardLabel>
              <CardHint>Acciones irreversibles sobre tus datos</CardHint>
            </CardInfo>
          </CardHeader>
          <CardEliminarData />
        </SettingsCard>

      </ContentArea>
    </Container>
  );
}

// ─── Styled Components ────────────────────────────────────────

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  background: ${({ theme }) => theme.bgtotal || "#0a0a0f"};
  color: ${({ theme }) => theme.text || "#f0f0f8"};
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 20px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  font-family: 'Sora', 'DM Sans', sans-serif;

  @media (max-width: 480px) {
    padding: 14px;
    gap: 14px;
  }

  .blob-one {
    top: -180px;
    left: -120px;
    background: radial-gradient(circle, rgba(155, 109, 255, 0.14) 0%, transparent 70%);
  }
  .blob-two {
    bottom: -160px;
    right: -80px;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.10) 0%, transparent 70%);
    width: 420px;
    height: 420px;
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

/* ── Header ── */

const HeaderRow = styled.header`
  display: flex;
  align-items: center;
  z-index: 200;
  position: relative;
  animation: ${slideIn} 0.5s ease both;
`;

/* ── Content area ── */

const ContentArea = styled.section`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  padding-bottom: 40px;

  @media (max-width: 480px) {
    gap: 14px;
    padding-bottom: 24px;
  }

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

/* ── Title ── */

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  animation: ${fadeUp} 0.5s ease both;
`;

const TitleIcon = styled.span`
  font-size: 2rem;
  line-height: 1;
`;

const PageTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.text || "#f0f0f8"};

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 0.8rem;
  margin: 0;
  color: ${({ theme }) => theme.colorSubtitle || "#8888aa"};
`;

/* ── Settings card ── */

const SettingsCard = styled.div`
  position: relative;
  z-index: ${({ danger }) => (danger ? 1 : 2)};
  background: rgba(255, 255, 255, 0.025);
  border-radius: 20px;
  border: 1px solid ${({ danger }) =>
    danger ? "rgba(255, 80, 80, 0.15)" : "rgba(255, 255, 255, 0.06)"};
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.03),
    0 16px 40px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  overflow: visible;
  display: flex;
  flex-direction: column;
  gap: 0;
  animation: ${fadeUp} 0.5s ${({ delay }) => delay || "0s"} ease both;
`;

const CardAccentBar = styled.div`
  height: 3px;
  width: 100%;
  background: ${({ danger }) =>
    danger
      ? "linear-gradient(90deg, rgba(255,80,80,0.7), transparent)"
      : "linear-gradient(90deg, #bf94ff, transparent)"};
  opacity: 0.9;
  flex-shrink: 0;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 20px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 480px) {
    padding: 16px 14px 10px;
    gap: 10px;
  }
`;

const CardIcon = styled.span`
  font-size: 1.5rem;
  line-height: 1;
  flex-shrink: 0;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CardLabel = styled.span`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text || "#f0f0f8"};
`;

const CardHint = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colorSubtitle || "#8888aa"};
`;

/* ── Selector row ── */

const SelectorRow = styled.div`
  position: relative;
  z-index: 100;
  padding: 18px 20px 12px;

  @media (max-width: 480px) {
    padding: 14px 14px 10px;
  }
`;

/* ── Save row ── */

const SaveRow = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 12px 20px 20px;
  position: relative;
  z-index: 1;

  @media (max-width: 480px) {
    padding: 10px 14px 16px;
    justify-content: stretch;

    /* Que el botón ocupe todo el ancho en móvil */
    & > * {
      width: 100%;
      justify-content: center;
    }
  }
`;
