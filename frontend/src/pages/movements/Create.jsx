import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMovement } from '../../services/movementsService';

export default function MovementCreatePage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    id_lote_interno: '',
    id_usuario: user?.id_usuario || 1,
    tipo_movimiento: 'ENTRADA',
    cantidad: '',
    motivo_baja: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await createMovement({
        ...formData,
        fecha_hora: new Date().toISOString()
      });
      navigate('/movements/list');
    } catch (err) {
      const detail = err.response?.data?.detail;
      const message = Array.isArray(detail)
        ? detail.map(item => `${item.loc?.slice(1).join('.') || 'Movement'}: ${item.msg}`).join('. ')
        : detail;
      setError(typeof message === 'string' ? message : err.message || 'Could not create movement.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'id_lote_interno' || name === 'cantidad' || name === 'id_usuario' ? Number(value) : value
    }));
  };

  return (
    <div className="mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl text-slate-800">Create New Movement</h1>
      </div>

      <div className="bg-white rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Batch ID (Lote Interno)</label>
              <input 
                required 
                type="number" 
                name="id_lote_interno" 
                value={formData.id_lote_interno} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Movement Type</label>
              <select
                required
                name="tipo_movimiento"
                value={formData.tipo_movimiento}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none"
              >
                <option value="ENTRADA">ENTRADA</option>
                <option value="SALIDA">SALIDA</option>
                <option value="BAJA">BAJA</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
              <input 
                required 
                type="number" 
                name="cantidad" 
                value={formData.cantidad} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Reason / Notes (Motivo Baja)</label>
              <input 
                type="text" 
                name="motivo_baja" 
                value={formData.motivo_baja} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none" 
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button type="button" onClick={() => navigate('/movements/list')} className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="px-5 py-2.5 text-sm font-medium bg-[#ed7b07] hover:bg-[#d66d06] text-white rounded-lg transition-colors shadow-sm disabled:cursor-not-allowed disabled:opacity-60">
              {submitting ? 'Saving...' : 'Save Movement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}