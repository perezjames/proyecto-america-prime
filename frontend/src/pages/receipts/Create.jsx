import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecepcion } from '../../services/recepcionesService';

export default function ReceiptCreatePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id_orden: '',
    bill_of_lading: '',
    numero_certificado_salud: '',
    estado_auditoria: '',
    origen_datos: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRecepcion(formData);
      navigate('/receipts/list');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'id_orden' ? Number(value) : value
    }));
  };

  return (
    <div className="mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl text-slate-800">Create New Receipt</h1>
      </div>

      <div className="bg-white rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Order ID</label>
              <input required type="number" name="id_orden" value={formData.id_orden} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Bill of Lading</label>
              <input required type="text" name="bill_of_lading" value={formData.bill_of_lading} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Health Certificate No.</label>
              <input required type="text" name="numero_certificado_salud" value={formData.numero_certificado_salud} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Audit Status</label>
              <input required type="text" name="estado_auditoria" value={formData.estado_auditoria} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Data Source</label>
            <input required type="text" name="origen_datos" value={formData.origen_datos} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ed7b07] outline-none" />
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button type="button" onClick={() => navigate('/receipts/list')} className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 text-sm font-medium bg-[#ed7b07] hover:bg-[#d66d06] text-white rounded-lg transition-colors shadow-sm">
              Save Receipt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}