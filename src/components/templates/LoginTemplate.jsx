import styled from "styled-components";
import { BtnSave } from "../moleculas/BtnSave";
import { v } from "../../styles/variables";
import { useAuthStore } from "../../store/AuthStore";
import { Device } from "../../styles/breakPoins";

export function LoginTemplate() {
  const { signInWithGoogle } = useAuthStore();
  return (
    <Container $imgfondo={v.imagenfondo}>
      <div className="contentCard">
        <span className="version">Version 1.0</span>
        <div className="contentImg">
          <img src={v.logo} />
        </div>
        <Titulo>Control gastos V.1</Titulo>
        <p className="frase">Toma el control de tus 💵 gastos e 💰 ingresos</p>
        <ContainerBtn>
          <BtnSave
            titulo="Iniciar con google"
            icono={<v.iconogoogle />}
            bgcolor={v.colorSecundario}
            funcion={signInWithGoogle}
          />
        </ContainerBtn>
      </div>
    </Container>
  );
}
const Container = styled.div`
  background-image: url(${(props) => props.$imgfondo});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.87);
  text-align: center;

  .contentCard {
    background-color: #1b1b1b;
    border-radius: 20px;
    gap: 30px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin: 20px;
    box-shadow: 8px 5px 18px 3px rgba(0, 0, 0, 0.35);

    @media ${Device.tablet} {
      width: 400px;
    }

    .version {
      color: #9e9b9b;
      text-align: start;
    }

    .contentImg {
      img {
        max-width: 40%;
        //animation: flotar 1.5s ease-in-out infinite alternate;
      }
    }
    .frase {
      color: #9e9b9b;
      font-size: 1.2rem;
    }
  }
  @keyframes flotar {
    0% {
      transform: translate(0, 0px);
    }
    50% {
      transform: translate(0, 15px);
    }
    100% {
      transform: translate(0, -0px);
    }
  }
`;

const Titulo = styled.span`
  font-size: 3rem;
  font-weight: 700;
  color: #9e9b9b;
`;

const ContainerBtn = styled.div`
  display: flex;
  justify-content: center;
`;
