import { MyRoutes } from "./routers/routes";
import { Sidebar } from "./components/organismos/sidebar/Sidebar";
import { Device } from "./styles/breakPoins";
import { Menuambur } from "./components/organismos/Menuambur";
import { useState } from "react";
import { ThemeProvider, styled } from "styled-components";
import { AuthContextProvider } from "./context/AuthContext";
import { GlobalStyles } from "./styles/globalStyles";
import { useThemeStore } from "./store/ThemeStore";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useUsuariosStore } from "./store/UsuariosStore";
import { SpinnerLoader } from "./components/moleculas/Spinner";
import { Login } from "./pages/Login";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { themeStyle } = useThemeStore();
  const { pathname } = useLocation();
  const { mostrarUsuarios } = useUsuariosStore();

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar usuarios"],
    queryFn: () => mostrarUsuarios(),
    enabled: pathname !== "/login",
    retry: false,
  });

  if (error && pathname !== "/login") {
    console.warn(
      "Sesión no detectada, redirigiendo o permitiendo navegación...",
    );
  }
  if (isLoading && pathname !== "/login") {
    return (
      <ThemeProvider theme={themeStyle}>
        <GlobalStyles />
        <SpinnerLoader fullScreen />
      </ThemeProvider>
    );
  }

  return (
    <>
      <ThemeProvider theme={themeStyle}>
        <AuthContextProvider>
          <GlobalStyles />
          {pathname != "/login" ? (
            <Container className={sidebarOpen ? "active" : ""}>
              <section className="ContentSidebar">
                <Sidebar
                  state={sidebarOpen}
                  setState={() => setSidebarOpen(!sidebarOpen)}
                />
              </section>
              <section className="ContentMenuambur">
                <Menuambur />
              </section>
              <section className="contentRouters">
                <MyRoutes />
              </section>
            </Container>
          ) : (
            <Login />
          )}
          <ReactQueryDevtools initialIsOpen={true} />
        </AuthContextProvider>
      </ThemeProvider>
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background: ${({ theme }) => theme.bgtotal};
  transition: 0.3s ease-in-out;

  .ContentSidebar {
    display: none;
  }
  .ContentMenuambur {
    display: block;
    position: absolute;
    left: 20px;
  }

  .contentRouters {
    /* background-color: rgba(78, 45, 78, 0.5);*/
    grid-column: 1;
    width: 100%;
  }

  @media ${Device.tablet} {
    grid-template-columns: 66px 1fr;

    &.active {
      grid-template-columns: 220px 1fr;
    }

    .ContentSidebar {
      display: initial;
    }
    .ContentMenuambur {
      display: none;
    }
    .contentRouters {
      grid-column: 2;
    }
  }
`;

export default App;
