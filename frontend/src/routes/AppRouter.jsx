import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';
import LotesPage from '../pages/LotesPage';
import MovimientosPage from '../pages/MovimientosPage';
import NotFoundPage from '../pages/NotFoundPage';
import OrdenesPage from '../pages/OrdenesPage';
import ProductosPage from '../pages/ProductosPage';
import RecepcionesPage from '../pages/RecepcionesPage';
import UsuariosPage from '../pages/UsuariosPage';
import LoginTempGuillermo from '../pages/LoginTempGuillermo';

function ProtectedRoute({ children }) {
  const isAuthenticated = Boolean(localStorage.getItem('user'));
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route
          path="/login"
          element={
            <LoginPage
          />}
        />

        {/* Rutas Protegidas dentro de Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/productos"
          element={
            <ProtectedRoute>
              <Layout>
                <ProductosPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/lotes"
          element={
            <ProtectedRoute>
              <Layout>
                <LotesPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/movimientos"
          element={
            <ProtectedRoute>
              <Layout>
                <MovimientosPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ordenes"
          element={
            <ProtectedRoute>
              <Layout>
                <OrdenesPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/recepciones"
          element={
            <ProtectedRoute>
              <Layout>
                <RecepcionesPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <Layout>
                <UsuariosPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/logintempguillermo"
          element={
            <ProtectedRoute>
              <Layout>
                <LoginTempGuillermo />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Ruta 404 para cualquier URL no registrada */}
        <Route path="*"
          element={
            <NotFoundPage
          />}
        />
      </Routes>
    </BrowserRouter>
  );
}