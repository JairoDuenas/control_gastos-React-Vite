import styled from "styled-components";
import { CategoriaTemplate } from "../components/templates/CategoriaTemplate";
import { useCategoriasStore } from "../store/CategoriasStore";
import { useQuery } from "@tanstack/react-query";
import { useUsuariosStore } from "../store/UsuariosStore";
import { useOperaciones } from "../store/OperacionesStore";

export function Categorias() {
  const { tipo } = useOperaciones();
  const { dataCategorias, mostrarCategorias } = useCategoriasStore();
  const { datausuarios } = useUsuariosStore();
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar categorias", tipo],
    queryFn: () =>
      mostrarCategorias({ id_usuario: datausuarios.id, tipo: tipo }),
  });

  return (
    <Container>
      <CategoriaTemplate data={dataCategorias} />
    </Container>
  );
}
const Container = styled.div`
  height: 100%;
`;
