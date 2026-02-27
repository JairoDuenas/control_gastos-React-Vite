import styled from "styled-components";
import { v } from "../../styles/variables";
import { getAllISOCodes } from "iso-country-currency";
import { ConvertirCapitalize } from "../../utils/Conversiones";
import { useState } from "react";
import { InputBuscadorLista } from "../moleculas/InputBuscadorLista";
import { Device } from "../../styles/breakPoins";

export function ListaPaises({ setSelect, setState }) {
  const isocodigos = getAllISOCodes();
  const [dataresult, setDataresult] = useState([]);

  function seleccionar(p) {
    setSelect(p);
    setState();
  }
  function buscar(e) {
    let filtrado = isocodigos.filter((item) => {
      return item.countryName == ConvertirCapitalize(e.target.value);
    });
    setDataresult(filtrado);
  }
  console.log(isocodigos);
  return (
    <Container>
      <header className="header">
        <span>Busca tu país</span>
        <span className="close" onClick={setState}>
          {<v.iconocerrar />}
        </span>
      </header>
      <InputBuscadorLista onChange={buscar} placeholder="buscar..." />

      {dataresult.length > 0 &&
        dataresult.map((item, index) => {
          return (
            <ItemContainer key={index} onClick={() => seleccionar(item)}>
              <span>{item.countryName}</span>
              <span>{item.symbol}</span>
            </ItemContainer>
          );
        })}
    </Container>
  );
}
const Container = styled.div`
  margin-top: 10px;
  position: absolute;
  top: 88%;
  width: 93%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bgtotal};
  border-radius: 10px;
  border: 3px solid #3a3a3a;
  padding: 10px;
  gap: 10px;
  color: ${({ theme }) => theme.text};
  transition: 0.3s;
  z-index: 999;
  @media ${Device.tablet} {
    width: 400px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: inherit;
    .close {
      cursor: pointer;
      font-size: 25px;
      transition: all 0.2s;
      &:hover {
        color: ${() => v.colorselector};
        transform: scale(1.2);
      }
    }
  }
`;

const ItemContainer = styled.section`
  gap: 10px;

  display: flex;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.bgitem};
  }
`;
