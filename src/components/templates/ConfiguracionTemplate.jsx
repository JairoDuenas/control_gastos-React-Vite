import styled from "styled-components";
import { Header } from "../organismos/Header";
import { useState } from "react";
import { Selector } from "../organismos/Selector";
import { v } from "../../styles/variables";
import { ListaPaises } from "../organismos/ListaPaises";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { BtnSave } from "../moleculas/BtnSave";
import { CardEliminarData } from "../organismos/CardEliminarData";

// ─── Shared components ────────────────────────────────────────
import { BgBlobs } from "../atomos/BgBlobs";
import { PageContainer } from "../atomos/PageContainer";
import { CardAccentBar } from "../atomos/ContentCard";
import { HeaderRow, TitleRow, SettingsCard } from "../moleculas/ToolbarGlass";
import { useRegistroControls } from "../../hooks/useRegistroControls.jsx";
import { useOperaciones } from "../../store/OperacionesStore";

// ─── Animations ───────────────────────────────────────────────

// ─── Component ────────────────────────────────────────────────
export function ConfiguracionTemplate() {
  const { datausuarios, editarMonedaUser } = useUsuariosStore();
  const [select, setSelect] = useState([]);
  //const [state, setState] = useState(false);
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

  const { setTipo } = useOperaciones();
  const { cerrarDesplegables, state, openUser } = useRegistroControls({
    setTipo,
  });

  return (
    <PageContainer onClick={cerrarDesplegables}>
      {/* Ambient blobs */}
      <BgBlobs />

      {/* ── Header ── */}
      <HeaderRow>
        <Header stateConfig={{ state: state, setState: openUser }} />
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
        <SettingsCard $delay="0.1s">
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
        <SettingsCard $delay="0.2s" $danger>
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
    </PageContainer>
  );
}

// ─── Styled Components ────────────────────────────────────────

/* ── Content area ── */

const ContentArea = styled.section`
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-bottom: 40px;

  @media (max-width: 480px) {
    gap: 14px;
    padding-bottom: 24px;
  }
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
  gap: 4px;
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
  padding: 18px 20px 12px;

  @media (max-width: 480px) {
    padding: 14px 14px 10px;
  }
`;

/* ── Save row ── */

const SaveRow = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px 20px 20px;
  margin-top: 20px;

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
