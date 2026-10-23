import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsuarioById, updateUsuario } from '../../services/usuariosService';

export default function UserEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    rol: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUsuarioById(id);
        setFormData({
          nombre: data.nombre,
          email: data.email,
          rol: data.rol
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUsuario(id, formData);
      navigate('/users/list');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading user data...</div>;

  return (
    <div className="mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl text-slate-800">Edit Profile and Roles</h1>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input required type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mail</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-5 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Assign Role</label>
              <select name="rol" value={formData.rol} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                <option value="Admin">Administrator</option>
                <option value="User">User</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button type="button" onClick={() => navigate('/users/list')} className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm">
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}