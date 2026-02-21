import styled from "styled-components";
import { ItemsDesplegable } from "./ItemsDesplegable";
import { v } from "../../styles/variables";

export function ListaMenuDesplegable({ data, top, funcion }) {
  return (
    <Container $top={top}>
      {data.map((item, index) => {
        return (
          <ItemsDesplegable
            key={`{${item.tipo}-${index}}`}
            item={item}
            funcion={() => funcion(item)}
          />
        );
      })}
    </Container>
  );
}
const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: ${({ theme }) => theme.bg3};
  border-radius: 22px;
  top: ${(props) => props.$top};
  box-shadow: ${() => v.boxshadowGray};
`;
