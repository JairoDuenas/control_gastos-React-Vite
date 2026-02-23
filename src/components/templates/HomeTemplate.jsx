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
      {/* Fondo decorativo sutil */}
      <div className="blobs">
        <div className="blob one"></div>
        <div className="blob two"></div>
      </div>
      <Container>
        <HeroSection>
          {/* Columna Izquierda: Textos y Acciones */}
          <ContentText>
            <Title>
              Controla tus gastos <br />
              <span>con inteligencia 💵</span>
            </Title>
            <SubText>
              Gestiona tus finanzas de forma intuitiva y moderna. Gracias por
              ser parte del cambio en el control de gastos.
            </SubText>

            <ContainerAutor>
              <div className="contentImg">
                <img src={logojd} alt="Autor" />
              </div>
              <div className="contentDescripcion">
                <b>Ing. Jhon Dueñas</b>
                <span>"Todos podemos programar"</span>
              </div>
            </ContainerAutor>

            <Actions>
              <BtnSave
                titulo="Telegram Comunitario"
                bgcolor="#bf94ff"
                icono={<v.iconoreact />}
              />
              <BtnSave
                titulo="Premium Accesss"
                bgcolor="#ffd700"
                icono={<v.iconocorona />}
              />
            </Actions>
          </ContentText>

          {/* Columna Derecha: Carrusel Centrado */}
          <BoxImage>
            <div className="carrusel-wrapper">
              <Carrusel />
            </div>
          </BoxImage>
        </HeroSection>
      </Container>
    </Main>
  );
}

const Main = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 15px;
  background-color: ${({ theme }) => theme.bgtotal};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;

  /* Decoración de fondo moderna */
  .blobs {
    position: absolute;
    inset: 0;
    z-index: 0;

    .blob {
      position: absolute;
      width: 500px;
      height: 500px;
      background: ${({ theme }) => theme.primary || "#bf94ff"};
      filter: blur(80px);
      opacity: 0.15;
      border-radius: 50%;
    }
    .one {
      top: -200px;
      left: -100px;
    }
    .two {
      bottom: -200px;
      right: -100px;
      background: #38bdf8;
    }
  }
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  z-index: 1;
`;

const HeroSection = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 60px;

  @media (max-width: 64em) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
`;

const ContentText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const Title = styled.h1`
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 800;
  line-height: 1.1;
  color: ${({ theme }) => theme.text};
  margin: 0;

  span {
    color: ${({ theme }) => theme.primary || "#bf94ff"};
    display: block;
  }
`;

const SubText = styled.p`
  font-size: ${({ theme }) => theme.fontlg};
  color: ${({ theme }) => theme.colorSubtitle};
  max-width: 550px;
  line-height: 1.6;

  @media (max-width: 64em) {
    margin: 0 auto;
  }
`;

const BoxImage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .carrusel-wrapper {
    width: 100%;
    max-width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    //background: rgba(255, 255, 255, 0.02); /* Sutil contenedor */
    padding: 20px;
    border-radius: 24px;

    //border: 1px solid rgba(255, 255, 255, 0.05);
  }

  @media (max-width: 64em) {
    grid-row: 1; // Mueve el carrusel arriba en móvil
    .carrusel-wrapper {
      max-width: 300px;
    }
  }
`;

const ContainerAutor = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: fit-content;

  @media (max-width: 64em) {
    margin: 0 auto;
  }

  .contentImg {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.primary || "#bf94ff"};
    padding: 3px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .contentDescripcion {
    text-align: left;
    display: flex;
    flex-direction: column;
    b {
      font-size: 1.1rem;
      color: ${({ theme }) => theme.text};
    }
    span {
      font-size: 0.8rem;
      color: ${({ theme }) => theme.colorSubtitle};
    }
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;

  @media (max-width: 64em) {
    justify-content: center;
  }
`;
