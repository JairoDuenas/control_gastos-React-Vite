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
          height="40px"
          width="40px"
          bgcolor={color}
          fontsize="25px"
          icono={icono}
          textcolor="#ffffff"
          translatex="-30px"
          translatey="-10px"
        />
      </section>
      <div className="glow-bar" />
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.bg};
  border-radius: 25px;
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ bordercolor }) => bordercolor + "60"};
    transition: 0.5s;
  }

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

  .glow-bar {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 2px;
    background: ${({ bordercolor }) => bordercolor};
    box-shadow: 0 0 12px ${({ bordercolor }) => bordercolor};
    opacity: 0.8;
  }
`;
