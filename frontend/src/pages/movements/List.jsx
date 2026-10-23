import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMovements, deleteMovement } from '../../services/movementsService';
import { Trash2, Edit2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MovementListPage() {
  const navigate = useNavigate();
  const [movements, setMovements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchMovements = async () => {
    try {
      const data = await getMovements();
      setMovements(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovements();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete movement #${id}?`)) {
      try {
        await deleteMovement(id);
        fetchMovements();
      } catch (err) {
        console.error("Error deleting", err);
      }
    }
  };

  const totalPages = Math.ceil(movements.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovements = movements.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-slate-800">Movement Management</h1>
      </div>

      <div className="rounded-xl overflow-hidden flex flex-col h-full">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#ed7b07] text-xs font-semibold text-white">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Batch ID</th>
                <th className="p-4">Type</th>
                <th className="p-4 text-center">Quantity</th>
                <th className="p-4">Reason / Notes</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {currentMovements.map((mov) => (
                <tr key={mov.id_movimiento} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">{mov.id_movimiento}</td>
                  <td className="p-4">{mov.id_lote_interno}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      mov.tipo_movimiento === 'ENTRADA' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {mov.tipo_movimiento}
                    </span>
                  </td>
                  <td className="p-4 text-center">{mov.cantidad}</td>
                  <td className="p-4">{mov.motivo_baja || '-'}</td>
                  <td className="p-4">{mov.fecha_hora ? new Date(mov.fecha_hora).toLocaleString() : '-'}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <button
                      onClick={() => navigate(`/movements/edit/${mov.id_movimiento}`)}
                      className="p-1.5 text-[#ed7b07] hover:bg-[#ffe5d1] rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(mov.id_movimiento)}
                      className="p-1.5 text-[#ed7b07] hover:bg-[#ffe5d1] rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {movements.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-400 text-sm">
                    No movements registered
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {movements.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 bg-[#ed7b07]/2">
            <span className="text-sm text-slate-600">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, movements.length)} of {movements.length}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded text-slate-600 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded text-slate-600 disabled:opacity-40 transition-colors"
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