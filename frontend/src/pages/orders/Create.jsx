import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrden } from '../../services/ordenesService';
import { ArrowLeft } from 'lucide-react';

export default function OrdenCreatePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id_orden: '',
    proveedor: '',
    fecha_orden: '',
    metodo_carga: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrden(formData);
      navigate('/ordenes');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/ordenes')} className="p-2 text-slate-400 hover:text-slate-700 bg-white rounded-lg border border-slate-200 shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-slate-800">Crear Nueva Orden</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Id_orden</label>
              <input required type="text" name="id_orden" value={formData.id_orden} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">proveedor</label>
              <input required type="text" name="proveedor" value={formData.proveedor} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Fecha_orden</label>
              <input required type="date" name="fecha_orden" value={formData.fecha_orden} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Metodo_Carga</label>
              <select name="metodo_carga" value={formData.metodo_carga} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none bg-white">
                <option value="IA">Script IA</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
            <button type="button" onClick={() => navigate('/ordenes')} className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              Cancelar
            </button>
            <button type="submit" className="px-5 py-2.5 text-sm font-medium bg-[#ed7b07] hover:bg-[#d66d06] text-white rounded-lg transition-colors shadow-sm">
              Guardar Orden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}