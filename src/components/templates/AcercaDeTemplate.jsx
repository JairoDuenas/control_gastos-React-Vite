import styled from "styled-components";
import { Header } from "../organismos/Header";
import { useRegistroControls } from "../../hooks/useRegistroControls.jsx";
import { useOperaciones } from "../../store/OperacionesStore.jsx";

export function AcercaDeTemplate() {
  // Stores
  const { setTipo } = useOperaciones();

  // Custom hook useRegistroControls
  const { cerrarDesplegables, state, openUser } = useRegistroControls({
    setTipo,
  });

  return (
    <Container onClick={cerrarDesplegables}>
      <header className="header">
        <Header stateConfig={{ state: state, setState: openUser }} />
      </header>
      <section className="area1"></section>
      <section className="area2"></section>
      <section className="main"></section>
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 15px;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  box-sizing: border-box;
  overflow: hidden;
  grid-template: "header" 100px "area1" 100px "area2" 50px "main" auto;

  .header {
    grid-area: header;
    background-color: rgba(103, 93, 241, 0.14);
    display: flex;
    align-items: center;
  }

  .area1 {
    grid-area: area1;
    background-color: rgba(229, 67, 26, 0.14);
    display: flex;
    align-items: center;
  }

  .area2 {
    grid-area: area2;
    background-color: rgba(77, 237, 106, 0.14);
    display: flex;
    align-items: center;
  }

  .main {
    grid-area: main;
    background-color: rgba(179, 46, 241, 0.14);
  }
`;
