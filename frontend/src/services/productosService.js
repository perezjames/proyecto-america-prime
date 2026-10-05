import api from '../api/axios';

export const getProductos = async () => {
  const response = await api.get('/productos/');
  return response.data;
};

export const getProductoByCodigo = async (codigo) => {
  const response = await api.get(`/productos/${codigo}`);
  return response.data;
};

export const createProducto = async (productoData) => {
  const response = await api.post('/productos/', productoData);
  return response.data;
};

export const updateProducto = async (codigo, productoData) => {
  const response = await api.put(`/productos/${codigo}`, productoData);
  return response.data;
};

export const deleteProducto = async (codigo) => {
  const response = await api.delete(`/productos/${codigo}`);
  return response.data;
};