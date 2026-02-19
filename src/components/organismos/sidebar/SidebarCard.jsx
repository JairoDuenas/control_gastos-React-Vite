import styled from "styled-components";
import { BtnSave } from "../../moleculas/BtnSave";
import { v } from "../../../styles/variables";

export function SidebarCard() {
  return (
    <Container>
      <span className="icon">{<v.iconoayuda />}</span>
      <div className="cardContent">
        <div className="circle1"></div>
        <div className="circle2"></div>
        <h3>Centro de ayuda</h3>
        <div className="contentBtn">
          <BtnSave titulo="Contactar" bgcolor="#f8f2fd" />
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  padding: 1rem 0.5rem;
  text-align: center;
  position: relative;
  box-sizing: border-box;
  .icon {
    position: absolute;
    border-radius: 50%;
    font-size: 3rem;
    top: -8px;

    right: 50%;
    transform: translate(50%);
    z-index: 100;
  }
  .cardContent {
    position: relative;
    padding: 1rem;
    background: ${({ theme }) => theme.bg5};
    border-radius: 12px;
    overflow: hidden;
    gap: 10px;

    .circle1,
    .circle2 {
      position: absolute;
      background: ${({ theme }) => theme.whiteBg};
      border-radius: 50%;
      opacity: 0.7;
    }
    .circle1 {
      height: 100px;
      width: 100px;
      top: -50px;
      left: -50px;
    }
    .circle2 {
      height: 130px;
      width: 130px;
      bottom: -80px;
      right: -70px;
      z-index: 1;
    }
    h3 {
      font-size: 1.1rem;
      margin-top: 1rem;
      padding: 1rem 0;
      font-weight: 800;
      color: #000;
    }
    .contentBtn {
      margin-left: -5px;
    }
  }
`;
