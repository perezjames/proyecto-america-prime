import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLote } from '../../services/lotesService';
import { ArrowLeft } from 'lucide-react';

export default function ProductCreatePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    codigo_producto: '',
    id_recepcion: '',
    lote_proveedor: '',
    fecha_sacrificio: '',
    fecha_empaque: '',
    fecha_vencimiento: '',
    cantidad_actual: '',
    id_lote_interno: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLote(formData);
      navigate('/batches/list ');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name.includes('peso') || name === 'stock_minimo' ? Number(value) : value }));
  };

  return (
    <div className="mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl text-slate-800">Create New Batch</h1>
      </div>

      <div className="bg-white rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Code</label>
              <input required type="text" name="codigo_producto" value={formData.codigo_producto} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">ID RECEPCION</label>
              <input required type="text" name="id_recepcion" value={formData.id_recepcion} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Presentation</label>
              <input required type="text" name="presentacion" value={formData.presentacion} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <input required type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Weight (oz)</label>
              <input type="number" name="peso_oz" value={formData.peso_oz} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Weight (gr)</label>
              <input type="number" name="peso_gr" value={formData.peso_gr} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Minimum Stock</label>
              <input type="number" name="stock_minimo" value={formData.stock_minimo} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none" />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button type="button" onClick={() => navigate('/products/list')} className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 text-sm font-medium bg-[#ed7b07] hover:bg-[#d66d06] text-white rounded-lg transition-colors shadow-sm">
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}