import api from '../api/axios';

export const getLotes = async () => {
  const response = await api.get('/lotes/');
  return response.data;
};

export const getLotesByCodigo = async (codigo) => {
  const response = await api.get(`/lotes/${codigo}`);
  return response.data;
};

export const createLote = async (loteData) => {
  const response = await api.post('/lotes/', loteData);
  return response.data;
};

export const updateLote = async (codigo, loteData) => {
  const response = await api.put(`/lotes/${codigo}`, loteData);
  return response.data;
};

export const deleteLote = async (codigo) => {
  const response = await api.delete(`/lotes/${codigo}`);
  return response.data;
};