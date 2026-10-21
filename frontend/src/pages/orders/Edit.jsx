import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrdenById, updateOrden } from '../../services/ordenesService';
import { ArrowLeft } from 'lucide-react';

export default function OrdenEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id_orden: '',
    proveedor: '',
    fecha_orden: '',
    metodo_carga: ''
  });

  useEffect(() => {
    const fetchOrden = async () => {
      try {
        const data = await getOrdenById(id);
        setFormData({
          id_orden: data.id_orden,
          proveedor: data.proveedor,
          fecha_orden: data.fecha_orden,
          metodo_carga: data.metodo_carga
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrden();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateOrden(id, formData);
      navigate('/ordenes');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Cargando datos de la orden...</div>;

  return (
<div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/ordenes')} className="p-2 text-slate-400 hover:text-slate-700 bg-white rounded-lg border border-slate-200 shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-slate-800">Editar Orden</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">ID de la Orden</label>
              <input required type="text" name="id_orden" value={formData.id_orden} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Proveedor</label>
              <input required type="text" name="proveedor" value={formData.proveedor} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-5 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Fecha de la Orden</label>
              <input required type="text" name="fecha_orden" value={formData.fecha_orden} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Método de Carga</label>
              <input required type="text" name="metodo_carga" value={formData.metodo_carga} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button type="button" onClick={() => navigate('/ordenes')} className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              Cancelar
            </button>
            <button type="submit" className="px-5 py-2.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm">
              Actualizar Orden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}