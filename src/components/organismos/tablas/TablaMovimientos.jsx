import styled from "styled-components";
import { ContentAccionesTabla } from "./ContentAccionesTabla";
import { Paginacion } from "./Paginacion";
import Swal from "sweetalert2";
import { v } from "../../../styles/variables";
import { useState } from "react";
import { useMovimientosStore } from "../../../store/MovimientosStore";

export function TablaMovimientos({
  data,
  setOpenRegistro,
  setDataSelect,
  setAccion,
}) {
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);
  const mx = data?.length / porPagina;
  const maximo = mx < 1 ? 1 : mx;

  const { eliminarMovimientos } = useMovimientosStore();

  function eliminar(p) {
    Swal.fire({
      title: "¿Estás seguro(a)?",
      text: "Una vez eliminado, ¡no podrá recuperar este registro!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminarMovimientos({
            id: p.id,
          });
          await Swal.fire({
            title: "¡Eliminado!",
            text: "El movimiento fue eliminado correctamente.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el movimiento.",
            icon: "error",
          });
        }
      }
    });
  }

  function editar(data) {
    setOpenRegistro(true);
    setDataSelect(data);
    setAccion("Editar");
  }
  return (
    <>
      <Container>
        <table className="responsive-table">
          <thead>
            <tr>
              <th scope="col">Estado</th>
              <th scope="col">Fecha</th>
              <th scope="col">Descripción</th>
              <th scope="col">Categoría</th>
              <th scope="col">Cuenta</th>
              <th scope="col">Valor</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data
                .slice(
                  (pagina - 1) * porPagina,
                  (pagina - 1) * porPagina + porPagina,
                )
                .map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">
                        <Situacion
                          $bgcolor={item.estado == "1" ? "#69e673" : "#b3b3b3"}
                        />
                      </th>
                      <td data-title="Fecha">{item.fecha}</td>
                      <td data-title="Descripción">{item.descripcion}</td>
                      <td data-title="Categoía">{item.categoria}</td>
                      <td data-title="Cuenta">{item.cuenta}</td>
                      <td data-title="Valor">{item.valorymoneda}</td>

                      <td data-title="Acciones">
                        <ContentAccionesTabla
                          funcionEditar={() => editar(item)}
                          funcionEliminar={() => eliminar(item)}
                        />
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
        <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  //background-color: #ffffff;

  margin: 5% 3%;
  @media (min-width: ${v.bpbart}) {
    margin: 2%;
  }
  @media (min-width: ${v.bphomer}) {
    margin: 2em auto;
    max-width: ${v.bphomer};
  }
  .responsive-table {
    width: 100%;
    margin-bottom: 1.5em;
    border-spacing: 0;
    @media (min-width: ${v.bpbart}) {
      font-size: 0.9em;
    }
    @media (min-width: ${v.bpmarge}) {
      font-size: 1em;
    }
    thead {
      position: absolute;

      padding: 0;
      border: 0;
      height: 1px;
      width: 1px;
      overflow: hidden;
      @media (min-width: ${v.bpbart}) {
        position: relative;
        height: auto;
        width: auto;
        overflow: auto;
      }
      th {
        border-bottom: 2px solid rgba(115, 115, 115, 0.32);
        font-weight: normal;
        text-align: center;
        color: ${({ theme }) => theme.text};
        &:first-of-type {
          text-align: center;
        }
      }
    }
    tbody,
    tr,
    th,
    td {
      display: block;
      padding: 0;
      text-align: left;
      white-space: normal;
    }
    tr {
      @media (min-width: ${v.bpbart}) {
        display: table-row;
      }
    }

    th,
    td {
      padding: 0.5em;
      vertical-align: middle;
      @media (min-width: ${v.bplisa}) {
        padding: 0.75em 0.5em;
      }
      @media (min-width: ${v.bpbart}) {
        display: table-cell;
        padding: 0.5em;
      }
      @media (min-width: ${v.bpmarge}) {
        padding: 0.75em 0.5em;
      }
      @media (min-width: ${v.bphomer}) {
        padding: 0.75em;
      }
    }
    tbody {
      @media (min-width: ${v.bpbart}) {
        display: table-row-group;
      }
      tr {
        margin-bottom: 1em;
        @media (min-width: ${v.bpbart}) {
          display: table-row;
          border-width: 1px;
        }
        &:last-of-type {
          margin-bottom: 0;
        }
        &:nth-of-type(even) {
          @media (min-width: ${v.bpbart}) {
            background-color: rgba(151, 151, 151, 0.12);
          }
        }
      }
      th[scope="row"] {
        @media (min-width: ${v.bplisa}) {
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
        }
        @media (min-width: ${v.bpbart}) {
          background-color: transparent;
          text-align: center;
          color: ${({ theme }) => theme.text};
        }
      }
      .Colordiv {
        text-align: right;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        @media (min-width: ${v.bpbart}) {
          justify-content: center;
        }
      }
      td {
        text-align: right;
        @media (min-width: ${v.bpbart}) {
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
          text-align: center;
        }
      }
      td[data-title]:before {
        content: attr(data-title);
        float: left;
        font-size: 0.8em;
        @media (min-width: ${v.bplisa}) {
          font-size: 0.9em;
        }
        @media (min-width: ${v.bpbart}) {
          content: none;
        }
      }
    }
  }
`;
const Colorcontent = styled.div`
  justify-content: center;
  min-height: ${(props) => props.$alto};
  width: ${(props) => props.$ancho};
  display: block;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  text-align: center;
`;

const Situacion = styled.div`
  display: flex;
  justify-content: center;
  &::before {
    content: "";
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.$bgcolor};
  }
`;
