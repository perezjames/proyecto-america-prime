import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRoles } from '../../services/rolesService';
import { createUsuario } from '../../services/usuariosService';

export default function UserCreatePage() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password_hash: '',
    rol_id: ''
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setRoles(await getRoles());
      } catch (err) {
        const detail = err.response?.data?.detail;
        setError(typeof detail === 'string' ? detail : err.message || 'Could not load roles.');
      } finally {
        setLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSubmitting(true);

  const usuarioData = {
    nombre: formData.nombre.trim(),
    email: formData.email.trim(),
    password_hash: formData.password_hash,
    rol_id: Number(formData.rol_id),
  };

  try {
    console.log('Datos enviados:', {
      ...usuarioData,
      password_hash: '[OCULTO]',
    });

    const resultado = await createUsuario(usuarioData);

    console.log('Usuario creado:', resultado);
    navigate('/users/list');
  } catch (err) {
    console.error('Estado HTTP:', err.response?.status);
    console.error(
      'Respuesta de FastAPI:',
      err.response?.data
    );

    const detail = err.response?.data?.detail;

    const message = Array.isArray(detail)
      ? detail.map((item) => {
          const campo = item.loc?.join('.');
          return `${campo ? campo + ': ' : ''}${item.msg}`;
        }).join('. ')
      : typeof detail === 'string'
        ? detail
        : err.message || 'No se pudo crear el usuario.';

    setError(message);
  } finally {
    setSubmitting(false);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'rol_id' && value ? Number(value) : value }));
  };

  return (
    <div className="mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl text-slate-800">Create New User</h1>
      </div>

      <div className="">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input required type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mail</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Temporary Password</label>
              <input required type="password" name="password_hash" value={formData.password_hash} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
              <select required name="rol_id" value={formData.rol_id} onChange={handleChange} disabled={loadingRoles || roles.length === 0} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none bg-white disabled:bg-slate-100">
                <option value="">
                  {loadingRoles ? 'Loading roles...' : roles.length ? 'Select a role' : 'No roles available'}
                </option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.rol}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
            <button type="button" onClick={() => navigate('/users/list')} className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={submitting || loadingRoles || roles.length === 0} className="px-5 py-2.5 text-sm font-medium bg-[#ed7b07] hover:bg-[#d66d06] text-white rounded-lg transition-colors shadow-sm disabled:cursor-not-allowed disabled:opacity-60">
              {submitting ? 'Saving...' : 'Save User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}