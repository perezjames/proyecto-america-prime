import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import List from '../pages/products/List';
import Create from '../pages/products/Create';
import Edit from '../pages/products/Edit';

import ListUser from '../pages/users/List';
import CreateUser from '../pages/users/Create';
import EditUser from '../pages/users/Edit';

import ListBatch from '../pages/batches/List';
import CreateBatch from '../pages/batches/Create';
import EditBatch from '../pages/batches/Edit';

// AGREGAR AQUI LAS RUTAS DE LOS DEMAS COMPONENTES



import RecepcionesPage from '../pages/RecepcionesPage';
import Loginv1 from '../pages/auth/LoginTempGuillermo';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/home/HomePage';
// import LoginPage from '../pages/auth/LoginPage';
import LotesPage from '../pages/LotesPage';
import MovimientosPage from '../pages/MovimientosPage';
import NotFoundPage from '../pages/NotFoundPage';
import OrdenesPage from '../pages/OrdenesPage';

function ProtectedRoute({ children }) {
  const isAuthenticated = Boolean(localStorage.getItem('user'));
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        {/*
        <Route
          path="/login"
          element={
            <LoginPage
          />}
        />
        */}

        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        

        {/* Rutas protegidas */}
        {/* 
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <HomePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        */}
        <Route
          path="/products/list"
          element={
            <ProtectedRoute>
              <Layout>
                <List />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/create"
          element={
            <ProtectedRoute>
              <Layout>
                <Create />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <Edit />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/list"
          element={
            <ProtectedRoute>
              <Layout>
                <ListUser />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/create"
          element={
            <ProtectedRoute>
              <Layout>
                <CreateUser />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/edit/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <EditUser />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/batches/list"
          element={
            <ProtectedRoute>
              <Layout>
                <ListBatch />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/batches/create"
          element={
            <ProtectedRoute>
              <Layout>
                <CreateBatch />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/batches/edit/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <EditBatch />
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
          path="/loginv1"
          element={
            <ProtectedRoute>
              <Layout>
                <Loginv1 />
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