import styled from "styled-components";

export const FilterGlass = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  padding: 12px 20px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.03); /* Fondo translúcido */
  backdrop-filter: blur(15px); /* Efecto cristal */
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;
