import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import LoginPage from '../pages/auth/LoginPage';
import HomePage from '../pages/home/HomePage';
import NotFoundPage from '../pages/found/NotFoundPage';

import List from '../pages/products/List';
import Create from '../pages/products/Create';
import Edit from '../pages/products/Edit';

import ListUser from '../pages/users/List';
import CreateUser from '../pages/users/Create';
import EditUser from '../pages/users/Edit';

import ListBatch from '../pages/batches/List';
import CreateBatch from '../pages/batches/Create';
import EditBatch from '../pages/batches/Edit';

import ListReceipt from '../pages/receipts/List';
import CreateReceipt from '../pages/receipts/Create';
import EditReceipt from '../pages/receipts/Edit';

import ListMovement from '../pages/movements/List';
import CreateMovement from '../pages/movements/Create';
import EditMovement from '../pages/movements/Edit';

import ListOrder from '../pages/orders/List';
import CreateOrder from '../pages/orders/Create';
import EditOrder from '../pages/orders/Edit';

function ProtectedRoute({ children }) {
  const isAuthenticated = Boolean(localStorage.getItem('user'));
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas publicas */}
        {/* Login */}
        <Route
          path="/login"
          element={
              <LoginPage />
          }
        />
        
        {/* 404 */}
        <Route path="*"
          element={
            <NotFoundPage
          />}
        />
        
        {/* Rutas protegidas */}
        {/* Home */}
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

        {/* Products */}
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

        {/* Users */}
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

        {/* Batches */}
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

        {/* Receipts */}
        <Route
          path="/receipts/list"
          element={
            <ProtectedRoute>
              <Layout>
                <ListReceipt />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/receipts/create"
          element={
            <ProtectedRoute>
              <Layout>
                <CreateReceipt />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/receipts/edit/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <EditReceipt />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Movements */}
        <Route
          path="/movements/list"
          element={
            <ProtectedRoute>
              <Layout>
                <ListMovement />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/movements/create"
          element={
            <ProtectedRoute>
              <Layout>
                <CreateMovement />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/movements/edit/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <EditMovement />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Orders */}
        <Route
          path="/orders/list"
          element={
            <ProtectedRoute>
              <Layout>
                <ListOrder />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/create"
          element={
            <ProtectedRoute>
              <Layout>
                <CreateOrder />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/edit/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <EditOrder />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}