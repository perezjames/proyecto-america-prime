import api from '../api/axios';

export const getOrdenes = async () => {
  const response = await api.get('/ordenes/');
  return response.data;
};

export const getOrdenById = async (id) => {
  const response = await api.get(`/ordenes/${id}`);
  return response.data;
};

export const createOrden = async (ordenData) => {
  const response = await api.post('/ordenes/', ordenData);
  return response.data;
};

export const updateOrden = async (id, ordenData) => {
  const response = await api.put(`/ordenes/${id}`, ordenData);
  return response.data;
};

export const deleteOrden = async (id) => {
  const response = await api.delete(`/ordenes/${id}`);
  return response.data;
};