import styled from "styled-components";
import { v } from "../../styles/variables";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { BtnCircular } from "../moleculas/BtnCircular";

export function CardTotales({ color, total, title, icono }) {
  const { datausuarios } = useUsuariosStore();
  return (
    <Container>
      <section className="contentTextos">
        <section>
          <span className="title">{title}</span>
          <b>{<v.iconoFlechabajo />}</b>
        </section>
        <span className="total">
          {datausuarios.moneda} {total}
        </span>
      </section>
      <section className="contentIcon">
        <BtnCircular
          height="50px"
          width="50px"
          bgcolor={color}
          fontsize="25px"
          icono={icono}
          textcolor="#ffffff"
          translatex="-45px"
          translatey="-15px"
        />
      </section>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 25px;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  justify-content: space-between;
  .contentTextos {
    display: flex;
    flex-direction: column;
    .title {
      font-size: 14px;
    }
    .total {
      font-size: 22px;
      font-weight: 500;
    }
    section {
      display: flex;
      gap: 10px;
      align-items: center;
    }
  }
  .contentIcon {
    display: flex;
  }
`;
