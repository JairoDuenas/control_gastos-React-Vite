import styled from "styled-components";
import { v } from "../../styles/variables";

export function BtnDesplegable({ text, textcolor, funcion }) {
  return (
    <Container $textcolor={textcolor} onClick={funcion}>
      <span className="containerText">
        {<v.iconoFlechabajo />}
        <h6>{text}</h6>
      </span>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.bgAlpha};
  color: ${(props) => props.$textcolor};
  font-weight: 500;
  font-size: 23px;
  padding: 0.9rem 2.1rem;
  border-radius: 50px;
  height: 30px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  .containerText {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colorhover};
  }
`;
