import styled from "styled-components";
import { Header } from "../organismos/Header";
import { useState } from "react";
import { Selector } from "../organismos/Selector";
import { v } from "../../styles/variables";
import { ListaPaises } from "../organismos/ListaPaises";
import { useUsuariosStore } from "../../store/UsuariosStore";
import { BtnSave } from "../moleculas/BtnSave";
import { CardEliminarData } from "../organismos/CardEliminarData";

export function ConfiguracionTemplate() {
  const { datausuarios, editarMonedaUser } = useUsuariosStore();
  const [select, setSelect] = useState([]);
  const [state, setState] = useState(false);
  const [stateListaPaises, setStateListaPaises] = useState(false);
  const moneda = select.symbol ? select.symbol : datausuarios.moneda;
  const pais = select.countryName ? select.countryName : datausuarios.pais;
  const paisSeleccionado = "💵 " + moneda + " " + pais;

  // Función editar
  const editar = async () => {
    const p = {
      moneda: moneda,
      pais: pais,
      id: datausuarios.id,
    };
    await editarMonedaUser(p);
  };

  return (
    <Container>
      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="area2">
        <h1>AJUSTES</h1>
        <ContentCard>
          <span>Moneda:</span>
          <Selector
            state={stateListaPaises}
            color={v.colorselector}
            texto1={paisSeleccionado}
            funcion={() => setStateListaPaises(!stateListaPaises)}
          />

          {stateListaPaises && (
            <ListaPaises
              setSelect={(p) => setSelect(p)}
              setState={() => setStateListaPaises(!stateListaPaises)}
            />
          )}
        </ContentCard>

        <ContentBtn>
          <BtnSave
            titulo="Guardar"
            bgcolor={v.colorselector}
            icono={<v.iconoguardar />}
            funcion={editar}
          />
        </ContentBtn>
        <CardEliminarData />
      </section>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100%;
  padding: 15px;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-areas: "header" "area2";
  box-sizing: border-box;
  overflow: hidden;

  .header {
    grid-area: header;
    //background-color: rgba(103, 93, 241, 0.14);
    display: flex;
    align-items: center;
    z-index: 2;
  }

  .area2 {
    grid-area: area2;
    width: 100%;
    //background-color: rgba(77, 237, 106, 0.14);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    overflow-y: auto;
    padding-top: 10px;
    //align-self: center;
    h1 {
      font-size: 3rem;
      margin: 0;
    }
  }
`;

const ContentCard = styled.div`
  width: 100%;
  display: flex;
  max-width: 1200px;
  align-items: center;
  justify-content: center;
  text-align: start;
  gap: 20px;
  position: relative;
`;

const ContentBtn = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
  display: flex;
  text-align: start;
  justify-content: center;
  align-items: center;
  gap: 20px;
  position: relative;
  width: 100%;
`;
