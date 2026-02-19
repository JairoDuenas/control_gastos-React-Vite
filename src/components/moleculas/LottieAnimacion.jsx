import styled from "styled-components";
import Lottie from "lottie-react";

export function LottieAnimacion({ alto, ancho, animacion }) {
  return (
    <Container>
      <Lottie
        animationData={animacion}
        loop={true}
        autoplay={true}
        style={{
          height: alto,
          width: ancho,
        }}
      />
    </Container>
  );
}
const Container = styled.div``;
