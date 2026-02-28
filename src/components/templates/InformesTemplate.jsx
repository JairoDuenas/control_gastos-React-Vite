import styled, { keyframes } from "styled-components";
import { Header } from "../organismos/Header";
import { useState } from "react";
import dayjs from "dayjs";
import { CalendarioLineal } from "../organismos/CalendarioLineal";
import { Tabs } from "../organismos/Tabs";
import { BtnDesplegable } from "../moleculas/BtnDesplegable";
import { ListaMenuDesplegable } from "../moleculas/ListaMenuDesplegable";
import { DataDesplegableMovimientos } from "../../utils/dataEstatica";
import { useOperaciones } from "../../store/OperacionesStore";
import { useRegistroControls } from "../../hooks/useRegistroControls.jsx";

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
  PageTitle,
  TabsWrap,
} from "../moleculas/ToolbarGlass";

// ─── Component ────────────────────────────────────────────────
export function InformesTemplate() {
  const { setTipo, colorCategoria, bgCategoria, tituloBtnDesMovimientos } =
    useOperaciones();

  const [value, setValue] = useState(dayjs(Date.now()));
  const [formatoFecha, setFormatoFecha] = useState("");

  const {
    cerrarDesplegables,
    state,
    stateTipo,
    openTipo,
    cambiarTipo,
    openUser,
  } = useRegistroControls({ setTipo });

  return (
    <PageContainer onClick={cerrarDesplegables}>
      {/* Ambient blobs */}
      <BgBlobs />

      {/* ── Header ── */}
      <HeaderRow>
        <Header stateConfig={{ state: state, setState: openUser }} />
      </HeaderRow>

      {/* ── Toolbar ── */}
      <ToolbarRow>
        <ToolbarGlass>
          <ShimmerLine />
          <ToolbarInner onClick={(e) => e.stopPropagation()}>
            <DropdownWrap>
              <BtnDesplegable
                textcolor={colorCategoria}
                bgcolor={bgCategoria}
                text={tituloBtnDesMovimientos}
                funcion={openTipo}
              />
              {stateTipo && (
                <ListaMenuDesplegable
                  data={DataDesplegableMovimientos}
                  top="112%"
                  funcion={(p) => cambiarTipo(p)}
                />
              )}
            </DropdownWrap>

            <ToolbarDivider />

            <PageTitle>Informes</PageTitle>
          </ToolbarInner>
        </ToolbarGlass>
      </ToolbarRow>

      {/* ── Calendario ── */}
      <CalendarioSection>
        <CalendarioLineal
          value={value}
          setValue={setValue}
          formatoFecha={formatoFecha}
          setFormatoFecha={setFormatoFecha}
        />
      </CalendarioSection>

      {/* ── Tabs / Contenido ── */}
      <MainSection>
        <ContentCard>
          <CardAccentBar color={bgCategoria} />
          <TabsWrap>
            <Tabs />
          </TabsWrap>
        </ContentCard>
      </MainSection>
    </PageContainer>
  );
}

// ─── Styled Components ────────────────────────────────────────
