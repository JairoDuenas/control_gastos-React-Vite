import styled, { keyframes, css } from "styled-components";

export const SpinnerLoader = ({
  mensaje = "Cargando...",
  fullScreen = false,
  size = 50,
  showBackground = true,
}) => {
  return (
    <Container $fullScreen={fullScreen} $showBackground={showBackground}>
      <Spinner $sise={size} />
      {mensaje && <Text>{mensaje}</Text>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  ${({ $fullScreen }) =>
    $fullScreen
      ? css`
          position: fixed;
          inset: 0;
          z-index: 9999;
        `
      : css`
          width: 100%;
          height: 100%;
        `}

  ${({ $fullScreen }) =>
    $fullScreen
      ? css`
          position: fixed;
          inset: 0;
          z-index: 9999;
        `
      : css`
          width: 100%;
          height: 100%;
        `}


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
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  border-left-color: ${({ theme }) => theme.color2 || theme.text};
  animation: ${spin} 1s linear infinite;
`;

const Text = styled.span`
  color: ${({ theme }) => theme.text};
  font-weight: 600;
  font-size: 1.1rem;
  font-family: "Poppins", sans-serif;
`;
