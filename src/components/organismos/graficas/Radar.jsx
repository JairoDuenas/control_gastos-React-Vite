import styled from "styled-components";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

import { Radar } from "react-chartjs-2";

import { useUsuariosStore } from "../../../store/UsuariosStore";

// Registrar módulos necesarios
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export function RadarGrafica({ datagrafica, data, titulo }) {
  const { datausuarios } = useUsuariosStore();
  return (
    <Container>
      <section>
        <Radar data={datagrafica} />
      </section>
      <section>
        <h3>{titulo} por categoría</h3>
        {data.map((item, index) => {
          return (
            <ContentCars key={index}>
              <div className="contentDescripcion">
                <span>{item.icono}</span>
                <span className="descripcion">{item.descripcion}</span>
              </div>
              <div className="contentValor">
                <span className="moneda">{datausuarios.moneda}</span>
                <span>{item.total}</span>
              </div>
            </ContentCars>
          );
        })}
      </section>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;
const ContentCars = styled.div`
  display: flex;
  justify-content: space-between;
  .contentDescripcion {
    display: flex;
    gap: 15px;
  }
  .contentValor {
    display: flex;
    gap: 8px;
  }
`;
