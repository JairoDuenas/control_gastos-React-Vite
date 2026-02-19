import styled from "styled-components";

export const Colorcontent = styled.div`
  justify-content: center;
  text-align: center;
  display: block;
  min-height: ${(props) => props.$alto};
  width: ${(props) => props.$ancho};
  background-color: ${(props) => props.$color};
  border-radius: 50%;
`;
