import api from '../api/axios';

export const getRoles = async () => {
  const response = await api.get('/roles/');
  return response.data;
};

export const getRoleById = async (id) => {
  const response = await api.get(`/roles/${id}`);
  return response.data;
};

export const createRoles = async (roleData) => {
  const response = await api.post('/roles/', roleData);
  return response.data;
};

export const updateRoles = async (codigo, roleData) => {
  const response = await api.put(`/roles/${codigo}`, roleData);
  return response.data;
};

export const deleteRoles = async (codigo) => {
  const response = await api.delete(`/roles/${codigo}`);
  return response.data;
};