import api from '../api/axios';

export const getUsuarios = async () => {
  const response = await api.get('/usuarios/');
  return response.data;
};

export const getUsuarioById = async (id) => {
  const response = await api.get(`/usuarios/${id}`);
  return response.data;
};

export const createUsuario = async (usuarioData) => {
  const response = await api.post('/usuarios/', productoData);
  return response.data;
};

export const updateUsuario = async (codigo, usuarioData) => {
  const response = await api.put(`/productos/${codigo}`, productoData);
  return response.data;
};

export const deleteUsuario = async (codigo) => {
  const response = await api.delete(`/usuarios/${codigo}`);
  return response.data;
};