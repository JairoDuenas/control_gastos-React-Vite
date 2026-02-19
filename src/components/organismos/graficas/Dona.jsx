import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useUsuariosStore } from "../../../store/UsuariosStore";

ChartJS.register(ArcElement, Tooltip, Legend);

export function Dona({ datagrafica, data, titulo }) {
  const { datausuarios } = useUsuariosStore();
  return (
    <Container>
      <section>
        <Doughnut data={datagrafica} />
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
  gap: 18px;
`;
const ContentCars = styled.div`
  display: flex;
  justify-content: space-between;

  .contentDescripcion {
    display: flex;
    gap: 10px;
  }
  .contentValor {
    display: flex;
    gap: 10px;
  }
`;
