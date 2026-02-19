import styled from "styled-components";
export function BtnFiltro({ bgcolor, textcolor, icono, funcion }) {
  return (
    <Container $textcolor={textcolor} $bgcolor={bgcolor} onClick={funcion}>
      <div className="contentIcon">
        <span>{icono}</span>
      </div>
    </Container>
  );
}
const Container = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 20px;
  background-color: ${(props) => props.$bgcolor};
  color: ${(props) => props.$textcolor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  position: relative;
  cursor: pointer;
  .contentIcon {
    position: absolute;
    top: 25%;
    bottom: 25%;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    transition: 0.2s;
    &:hover {
      transform: scale(1.4);
    }
  }
`;
