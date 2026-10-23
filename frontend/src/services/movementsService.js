import api from '../api/axios';

export const getMovements = async () => {
  const response = await api.get('/movimientos/');
  return response.data;
};

export const getMovementById = async (id) => {
  const response = await api.get(`/movimientos/${id}`);
  return response.data;
};

export const createMovement = async (movementData) => {
  const response = await api.post('/movimientos/', movementData);
  return response.data;
};

export const updateMovement = async (id, movementData) => {
  const response = await api.put(`/movimientos/${id}`, movementData);
  return response.data;
};

export const deleteMovement = async (id) => {
  const response = await api.delete(`/movimientos/${id}`);
  return response.data;
};