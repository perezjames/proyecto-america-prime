import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLotes, deleteLote } from '../../services/lotesService';
import { Trash2, Edit2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductListPage() {
  const navigate = useNavigate();
  const [lotes, setLotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchLotes = async () => {
    try {
      const data = await getLotes();
      setLotes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLotes();
  }, []);

  const handleDelete = async (codigo) => {
    if (window.confirm(`Are you sure you want to delete product ${codigo}?`)) {
      try {
        await deleteLote(codigo);
        fetchLotes();
      } catch (err) {
        console.error("Error deleting", err);
      }
    }
  };

  const totalPages = Math.ceil(lotes.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLotes = lotes.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-slate-800">Batch Management</h1>
      </div>

      <div className="rounded-xl overflow-hidden flex flex-col h-full">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#ed7b07] text-xs font-semibold text-white">
              <tr>
                <th className="p-4">Code</th>
                <th className="p-4">Id Reception</th>
                <th className="p-4">Lote provvedor</th>
                <th className="p-4 text-center">Date Sacrifice</th>
                <th className="p-4 text-center">Date Empaque</th>
                <th className="p-4 text-center">Date Expiration</th>
                <th className="p-4 text-center">Cantidad Actual</th>
                <th className="p-4 text-center">id lote int</th>
                <th className="p-4 text-center">acciones</th>
              </tr>
            </thead>

            
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {currentLotes.map((prod) => (
                <tr key={prod.codigo_producto} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-semibold">{prod.codigo_producto}</td>
                  <td className="p-4">{prod.id_recepcion}</td>
                  <td className="p-4">{prod.lote_proveedor}</td>
                  <td className="p-4 text-center">{prod.fecha_sacrificio}</td>
                  <td className="p-4 text-center">{prod.fecha_empaque}</td>
                  <td className="p-4 text-center">{prod.fecha_vencimiento}</td>
                  <td className="p-4 text-center">{prod.cantidad_actual}</td>
                  <td className="p-4 text-center">{prod.id_lote_interno}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <button
                      onClick={() => navigate(`/products/edit/${prod.codigo_producto}`)}
                      className="p-1.5 text-[#ed7b07] hover:bg-[#ffe5d1] rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(prod.codigo_producto)}
                      className="p-1.5 text-[#ed7b07] hover:bg-[#ffe5d1] rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {lotes.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-400 text-sm">
                    No products registered
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Controles de Paginación */}
        {lotes.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 bg-[#ed7b07]/2">
            <span className="text-sm text-slate">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, lotes.length)} of {lotes.length}
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