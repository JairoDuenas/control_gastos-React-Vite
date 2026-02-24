import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useUsuariosStore } from "../../../store/UsuariosStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export function Lineal({ datagrafica, data, titulo }) {
  const { datausuarios } = useUsuariosStore();
  return (
    <Container>
      <section>
        <Line data={datagrafica} />
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
