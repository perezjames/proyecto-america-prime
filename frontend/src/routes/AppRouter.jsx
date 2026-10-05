import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import DashboardPage from '../pages/DashboardPage';
import ProductosPage from '../pages/ProductosPage';
import UsuariosPage from '../pages/UsuariosPage';
import OrdenesPage from '../pages/OrdenesPage';
import RecepcionesPage from '../pages/RecepcionesPage';
import LotesPage from '../pages/LotesPage';
import MovimientosPage from '../pages/MovimientosPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/ordenes" element={<OrdenesPage />} />
          <Route path="/recepciones" element={<RecepcionesPage />} />
          <Route path="/lotes" element={<LotesPage />} />
          <Route path="/movimientos" element={<MovimientosPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}