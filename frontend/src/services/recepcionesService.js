import api from '../api/axios';

export const getRecepciones = async () => {
  const response = await api.get('/recepciones/');
  return response.data;
};

export const getRecepcionById = async (id) => {
  const response = await api.get(`/recepciones/${id}`);
  return response.data;
};

export const createRecepcion = async (recepcionData) => {
  const response = await api.post('/recepciones/', recepcionData);
  return response.data;
};

export const updateRecepcion = async (id, recepcionData) => {
  const response = await api.put(`/recepciones/${id}`, recepcionData);
  return response.data;
};

export const deleteRecepcion = async (id) => {
  const response = await api.delete(`/recepciones/${id}`);
  return response.data;
};