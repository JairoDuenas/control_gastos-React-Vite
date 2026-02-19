import styled from "styled-components";
import { UserAuth } from "../../context/AuthContext";
import { BtnCircular } from "../moleculas/BtnCircular";
import { v } from "../../styles/variables";
import { ListaMenuDesplegable } from "../moleculas/ListaMenuDesplegable";
import { DesplegableUser } from "../../utils/dataEstatica";
import { useAuthStore } from "../../store/AuthStore";
import imgDefault from "../../assets/favicon.png";
import { useNavigate } from "react-router-dom";

export function DataUser({ stateConfig }) {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const { cerrarSesion } = useAuthStore();

  const funcionXtipo = async (item) => {
    if (item.tipo === "cerrarsesion") {
      await cerrarSesion();
      navigate("/login");
    }
    if (item.tipo === "route") {
      navigate(item.path);
    }
  };

  // 2. Evitar que el componente se rompa si user es null
  if (!user) return null;

  return (
    <Container onClick={stateConfig.setState}>
      <div className="imgContainer">
        <img
          src={user.picture || imgDefault}
          alt="profile"
          referrerPolicy="no-referrer" // Importante para imágenes de Google/Facebook
          onError={(e) => {
            e.target.src = imgDefault;
          }} // Si el link falla, pone la default
        />
      </div>
      <BtnCircular
        icono={<v.iconocorona />}
        width="25px"
        height="25px"
        bgcolor="background: #8cbbcf;
        background: linear-gradient(90deg, rgba(140, 187, 207, 1) 0%, rgba(182, 222, 199, 1) 100%);0%);"
        textcolor="#181616"
        fontsize="11px"
        translatex="-58px"
        translatey="-18px"
      />
      <span className="nombre">{user.name}</span>
      {stateConfig.state && (
        <ListaMenuDesplegable
          data={DesplegableUser}
          top="62px"
          funcion={(tipo) => funcionXtipo(tipo)}
        />
      )}
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  top: 0px;
  right: 0;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 50px;
  margin: 15px;
  cursor: pointer;

  .imgContainer {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    min-height: 40px;
    min-width: 40px;
    overflow: hidden;
    margin-right: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      //height: 100%;
      object-fit: cover;
    }
  }
  &:hover {
    background-color: ${({ theme }) => theme.bg3};
  }
  .nombre {
    width: 100%;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }
`;
