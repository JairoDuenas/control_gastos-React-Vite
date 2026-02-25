import styled from "styled-components";

export const ContentWrapper = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 28px;
  padding: 25px;
  border: 1px solid ${({ theme }) => theme.colorborder};
  box-shadow: inset 0 0 30px ${({ theme }) => theme.shadowtable};
  min-height: 400px;
  display: flex;
  flex-direction: column;
`;
