import styled from "styled-components";
import { Carrusel } from "../moleculas/Carrusel";
import logojd from "../../assets/favicon.png";
import { BtnSave } from "../moleculas/BtnSave";
import { v } from "../../styles/variables";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export function HomeTemplate() {
  return (
    <Main>
      <Container>
        <Box>
          <Carrusel />
        </Box>
        <Title>
          Bienvenido a la App control de gastos <br /> 💵
        </Title>
        <SubText>
          Otra manera de controlar sus gastos <br />
          <br />
          MUCHAS GRACIAS POR APOYAR ESTE PROYECTO
        </SubText>
        <ContainerAutor>
          <div className="contentImg">
            <img src={logojd} alt="" />
          </div>
          <div className="contentDescripcion">
            <b>Ing. Jhon Dueñas</b>
            <span>"Todos podemos programar"</span>
          </div>
        </ContainerAutor>
        <ButtonContainer>
          <BtnSave
            titulo="Unirse a Telegram"
            bgcolor="#bf94ff"
            icono={<v.iconoreact />}
          />
        </ButtonContainer>
        <ButtonContainer>
          <BtnSave
            titulo="Unirse a Telegram"
            bgcolor="#bf94ff"
            icono={<v.iconocorona />}
          />
        </ButtonContainer>
      </Container>
    </Main>
  );
}

const Main = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.bgtotal};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  width: 75%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text};
`;

const Box = styled.div`
  width: 50%;
  height: 100%;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 40em) {
    min-height: 50vh;
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontxxl};
  text-transform: capitalize;
  color: ${({ theme }) => theme.text};
  align-self: flex-start;
  width: 80%;
  margin: 0 auto;

  @media (max-width: 64em) {
    width: 100%;
    text-align: center;
  }

  @media (max-width: 40em) {
    font-size: ${({ theme }) => theme.fontxl};
  }

  @media (max-width: 30em) {
    font-size: ${({ theme }) => theme.fontlg};
  }
`;

const SubText = styled.p`
  font-size: ${({ theme }) => theme.fontlg};
  color: ${({ theme }) => theme.colorSubtitle};
  align-self: flex-start;
  width: 80%;
  margin: 1rem auto;
  font-weight: 400;

  @media (max-width: 64em) {
    width: 100%;
    text-align: center;
    font-size: ${({ theme }) => theme.fontmd};
  }

  @media (max-width: 40em) {
    font-size: ${({ theme }) => theme.fontmd};
  }

  @media (max-width: 30em) {
    font-size: ${({ theme }) => theme.fontsm};
  }
`;

const ContainerAutor = styled.div`
  display: flex;
  align-items: center;
  //justify-content: center;
  gap: 20px;

  .contentImg {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .contentDescripcion {
    display: flex;
    flex-direction: column;
    span {
      color: ${({ theme }) => theme.colorSubtitle};
    }
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin: 1rem auto;
  display: flex;
  justify-content: center;
  align-self: center;
  gap: 20px;

  @media (max-width: 64em) {
    width: 100%;
  }
`;
