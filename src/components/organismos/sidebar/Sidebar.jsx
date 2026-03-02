import styled, { keyframes } from "styled-components";
import { v } from "../../../styles/variables";
import { LinksArray, SecondarylinksArray } from "../../../utils/dataEstatica";
import { SidebarCard } from "../sidebar/SidebarCard";
import { NavLink } from "react-router-dom";
import { ToggleTema } from "../ToggleTema";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(-6px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(4px); }
`;

export function Sidebar({ state, setState }) {
  return (
    <Main $isopen={state.toString()}>
      <span className="Sidebarbutton" onClick={() => setState(!state)}>
        <v.iconoflechaderecha />
      </span>

      <Container $isopen={state.toString()} className={state ? "active" : ""}>
        {/* Logo */}
        <div className="Logocontent">
          <div className="imgcontent">
            <img src={v.logo} alt="logo" />
          </div>
          {state && <h2>Jairodv 3.0</h2>}
        </div>

        {/* Links primarios */}
        {LinksArray.map(({ icon, label, to }) => (
          <div
            className={state ? "LinkContainer active" : "LinkContainer"}
            key={label}
          >
            <NavLink
              to={to}
              className={({ isActive }) => `Links${isActive ? " active" : ""}`}
            >
              <div className="Linkicon">{icon}</div>
              <span className={state ? "label_ver" : "label_oculto"}>
                {label}
              </span>
            </NavLink>
          </div>
        ))}

        <Divider />

        {/* Links secundarios */}
        {SecondarylinksArray.map(({ icon, label, to }) => (
          <div
            className={state ? "LinkContainer active" : "LinkContainer"}
            key={label}
          >
            <NavLink
              to={to}
              className={({ isActive }) => `Links${isActive ? " active" : ""}`}
            >
              <div className="Linkicon">{icon}</div>
              <span className={state ? "label_ver" : "label_oculto"}>
                {label}
              </span>
            </NavLink>
          </div>
        ))}
        <Divider />

        <div className="toggle-content">
          <ToggleTema />
        </div>

        <Divider />

        {state && <SidebarCard />}
      </Container>
    </Main>
  );
}

// ─── Styled Components ────────────────────────────────────────

const Container = styled.div`
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 16px;
  /* z-index alto para quedar encima de todo el contenido */
  z-index: 100;
  height: 100%;
  width: 65px;
  transition: width 0.2s ease-in-out;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 2px 0 24px rgba(0, 0, 0, 0.35);

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(191, 148, 255, 0.3);
    border-radius: 99px;
  }

  &.active {
    width: 220px;
  }

  /* ── Logo ── */
  .Logocontent {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    /* padding fijo sin depender de scale */
    padding: 4px 0 20px;
    overflow: hidden;

    .imgcontent {
      flex-shrink: 0;
      /* tamaño fijo — sin scale que lo haga salir del sidebar */
      width: 34px;
      height: 34px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        animation: ${float} 2s ease-in-out infinite alternate;
      }
    }

    h2 {
      font-size: 0.88rem;
      font-weight: 800;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: -0.02em;
      color: ${({ theme }) => theme.text};
      animation: ${fadeIn} 0.2s ease both;
    }
  }

  /* ── Links ── */
  .LinkContainer {
    margin: 2px 0;
    //padding: 0 8px;
    position: relative;
    border-radius: 12px;
    transition: background 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.04);
    }

    .Links {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: ${({ theme }) => theme.text};
      height: 44px;
      gap: 8px;
      opacity: 0.6;
      transition: opacity 0.2s;
      border-radius: 12px;
      padding: 0 4px;

      .Linkicon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        flex-shrink: 0;
        svg {
          font-size: 20px;
        }
      }

      .label_ver {
        font-size: 0.82rem;
        font-weight: 600;
        white-space: nowrap;
        animation: ${fadeIn} 0.15s ease both;
      }
      .label_oculto {
        display: none;
      }

      &:hover {
        opacity: 0.9;
      }

      &.active {
        color: #bf94ff;
        opacity: 1;

        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 20%;
          height: 60%;
          width: 3px;
          border-radius: 0 4px 4px 0;
          background: #bf94ff;
        }
      }
    }

    &.active {
      padding: 0 8px;
    }
  }

  /* ── Toggle ── */
  .toggle-content {
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Main = styled.div`
  .Sidebarbutton {
    position: fixed;
    top: 68px;
    left: 42px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: ${({ theme }) => theme.bgtgderecha || "rgba(255,255,255,0.08)"};
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.04),
      0 4px 12px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition:
      transform 0.3s ease,
      background 0.2s;
    /* Por encima del Container */
    z-index: 10000;
    color: ${({ theme }) => theme.text};
    transform: ${({ $isopen }) =>
      $isopen === "true"
        ? "translateX(162px) rotate(3.142rad)"
        : "translateX(0)"};

    &:hover {
      background: rgba(191, 148, 255, 0.15);
      border-color: rgba(191, 148, 255, 0.3);
    }

    svg {
      font-size: 12px;
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  margin: 8px 14px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.07),
    transparent
  );
`;
