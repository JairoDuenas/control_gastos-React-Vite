import styled, { keyframes } from "styled-components";

export const SpinnerLoader = ({ mensaje = "Cargando..." }) => {
  return (
    <Container>
      <Spinner />
      <Text>{mensaje}</Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* Usa fixed para cubrir TODO sin importar márgenes del body */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: ${({ theme }) => theme.bgtotal};
  z-index: 9999; /* Asegura que esté por encima de todo */
  gap: 20px;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border-left-color: ${({ theme }) => theme.color2 || theme.text};
  animation: ${spin} 1s linear infinite;
`;

const Text = styled.span`
  color: ${({ theme }) => theme.text};
  font-weight: 600;
  font-size: 1.2rem;
  font-family: "Poppins", sans-serif;
`;
