import styled from "styled-components";
import { v } from "../../styles/variables";

export function BtnCerrar({ funcion }) {
  return <Container onClick={funcion}>{<v.iconocerrar />}</Container>;
}
const Container = styled.span`
  cursor: pointer;
  font-size: 25px;
  transition: 0.2s;
  left: 0;
  right: 0;
  &:hover {
    color: ${() => v.colorselector};
    transform: scale(1.2);
  }
`;
