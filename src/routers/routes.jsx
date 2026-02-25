import { Routes, Route } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { ProtectedRoute } from "../hooks/ProtectedRoute";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Configuracion } from "../pages/Configuracion";
import { Categorias } from "../pages/Categorias";
import { Movimientos } from "../pages/Movimientos";
import { Informes } from "../pages/Informes";
import { Dashboard } from "../pages/Dashboard";
import { AcercaDe } from "../pages/AcercaDe";

export function MyRoutes() {
  const { user } = UserAuth();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        <Route path="/" element={<Home />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/movimientos" element={<Movimientos />} />
        <Route path="/informes" element={<Informes />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/acercade" element={<AcercaDe />} />
      </Route>
    </Routes>
  );
}
