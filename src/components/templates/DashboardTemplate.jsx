import styled from "styled-components";
import { Header } from "../organismos/Header";
import { useState } from "react";
import { BtnDesplegable } from "../moleculas/BtnDesplegable";
import { ListaMenuDesplegable } from "../moleculas/ListaMenuDesplegable";
import { useOperaciones } from "../../store/OperacionesStore";
import { DataDesplegableMovimientos } from "../../utils/dataEstatica";
import { CalendarioLineal } from "../organismos/CalendarioLineal";
import dayjs from "dayjs";
import { useMovimientosStore } from "../../store/MovimientosStore";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { useRegistroControls } from "../../hooks/useRegistroControls.jsx.jsx";
import { useReporteMovimientosQuery } from "../../queries/useReporteMovimientosQuery.jsx";
import { RadarGrafica } from "../organismos/graficas/Radar.jsx";
import { useDashboardGrafica } from "../../hooks/useDashboardGrafica.jsx";
import { SkeletonGrafica } from "../moleculas/SkeletonGrafica.jsx";

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
  ChartWrap,
} from "../moleculas/ToolbarGlass";

// ─── Component ────────────────────────────────────────────────
export function DashboardTemplate() {
  const [value, setValue] = useState(dayjs(Date.now()));
  const [formatoFecha, setFormatoFecha] = useState("");

  const { id_usuario } = useUsuariosStore();
  const { dataRptMovimientosAñoMes } = useMovimientosStore();

  const {
    setTipo,
    colorCategoria,
    bgCategoria,
    tituloBtnDesMovimientos,
    año,
    mes,
    tipo,
  } = useOperaciones();

  const {
    cerrarDesplegables,
    state,
    openUser,
    openTipo,
    stateTipo,
    cambiarTipo,
  } = useRegistroControls({ setTipo });

  const { isLoading } = useReporteMovimientosQuery({
    año,
    mes,
    tipo,
    id_usuario,
  });

  const { datagrafica } = useDashboardGrafica();

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

            <PageTitle>Dashboard</PageTitle>
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

      {/* ── Gráfica Radar ── */}
      <MainSection>
        <ContentCard>
          <CardAccentBar color={bgCategoria} />
          <ChartWrap>
            {isLoading ? (
              <SkeletonGrafica bars={8} height="300px" />
            ) : (
              <RadarGrafica
                datagrafica={datagrafica}
                data={dataRptMovimientosAñoMes}
                titulo={tituloBtnDesMovimientos}
              />
            )}
          </ChartWrap>
        </ContentCard>
      </MainSection>
    </PageContainer>
  );
}
