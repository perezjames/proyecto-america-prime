import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecepciones, deleteRecepcion } from '../../services/recepcionesService';
import { Trash2, Edit2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ReceiptListPage() {
  const navigate = useNavigate();
  const [recepciones, setRecepciones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchRecepciones = async () => {
    try {
      const data = await getRecepciones();
      setRecepciones(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecepciones();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete receipt ${id}?`)) {
      try {
        await deleteRecepcion(id);
        fetchRecepciones();
      } catch (err) {
        console.error("Error deleting", err);
      }
    }
  };

  const totalPages = Math.ceil(recepciones.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecepciones = recepciones.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-slate-800">Receipt Management</h1>
      </div>

      <div className="rounded-xl overflow-hidden flex flex-col h-full">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#ed7b07] text-xs font-semibold text-white">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Order ID</th>
                <th className="p-4">Bill of Lading</th>
                <th className="p-4">Certificate No.</th>
                <th className="p-4 text-center">Audit Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {currentRecepciones.map((rec) => (
                <tr key={rec.id_recepcion} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">{rec.id_recepcion}</td>
                  <td className="p-4">{rec.id_orden}</td>
                  <td className="p-4">{rec.bill_of_lading}</td>
                  <td className="p-4">{rec.numero_certificado_salud}</td>
                  <td className="p-4 text-center">{rec.estado_auditoria}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <button
                      onClick={() => navigate(`/receipts/edit/${rec.id_recepcion}`)}
                      className="p-1.5 text-[#ed7b07] hover:bg-[#ffe5d1] rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(rec.id_recepcion)}
                      className="p-1.5 text-[#ed7b07] hover:bg-[#ffe5d1] rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {recepciones.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-slate-400 text-sm">
                    No receipts registered
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Controles de Paginación */}
        {recepciones.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 bg-[#ed7b07]/2">
            <span className="text-sm text-slate">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, recepciones.length)} of {recepciones.length}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded text-slate disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded text-slate disabled:opacity-40 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}