import styled from "styled-components";
import { DataUser } from "./DataUser";

export function Header({ stateConfig }) {
  return (
    <ContentHeader>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DataUser stateConfig={stateConfig} />
      </div>
    </ContentHeader>
  );
}

export const ContentHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: end;
`;
