import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ProductosPage from '../pages/ProductosPage';
import UsuariosPage from '../pages/UsuariosPage';
import OrdenesPage from '../pages/OrdenesPage';
import RecepcionesPage from '../pages/RecepcionesPage';
import LotesPage from '../pages/LotesPage';
import MovimientosPage from '../pages/MovimientosPage';
import Jesus from '../pages/jesus/Jesus';
import Guillermo from '../pages/guillermo/Guillermo';

function ProtectedRoute({ children }) {
  const user = localStorage.getItem('user');
  return user ? children : <Navigate to="/login" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/*" element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/productos" element={<ProductosPage />} />
                <Route path="/usuarios" element={<UsuariosPage />} />
                <Route path="/ordenes" element={<OrdenesPage />} />
                <Route path="/recepciones" element={<RecepcionesPage />} />
                <Route path="/lotes" element={<LotesPage />} />
                <Route path="/movimientos" element={<MovimientosPage />} />
                <Route path="/jesus" element={<Jesus />} />
                <Route path="/guillermo" element={<Guillermo />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}