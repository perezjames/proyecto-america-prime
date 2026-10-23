import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovementById, updateMovement } from '../../services/movementsService';

export default function MovementEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id_movimiento: '',
    id_lote_interno: '',
    id_usuario: '',
    tipo_movimiento: '',
    cantidad: '',
    motivo_baja: ''
  });

  useEffect(() => {
    const fetchMovement = async () => {
      try {
        const data = await getMovementById(id);
        setFormData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovement();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMovement(id, formData);
      navigate('/movements/list');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'id_lote_interno' || name === 'cantidad' || name === 'id_usuario' ? Number(value) : value
    }));
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading...</div>;

  return (
    <div className="mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl text-slate-800">Edit Movement #{id}</h1>
      </div>

      <div className="bg-white rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <button type="submit" className="px-5 py-2.5 text-sm font-medium bg-[#ed7b07] hover:bg-[#d66d06] text-white rounded-lg transition-colors shadow-sm">
              Update Movement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}