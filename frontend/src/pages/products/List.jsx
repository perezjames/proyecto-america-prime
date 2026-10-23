import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductos, deleteProducto } from '../../services/productosService';
import { Trash2, Edit2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductListPage() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleDelete = async (codigo) => {
    if (window.confirm(`Are you sure you want to delete product ${codigo}?`)) {
      try {
        await deleteProducto(codigo);
        fetchProductos();
      } catch (err) {
        console.error("Error deleting", err);
      }
    }
  };

  const totalPages = Math.ceil(productos.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProductos = productos.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-slate-800">Product Management</h1>
      </div>

      <div className="rounded-xl overflow-hidden flex flex-col h-full">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#ed7b07] text-xs font-semibold text-white">
              <tr>
                <th className="p-4">Code</th>
                <th className="p-4">Description</th>
                <th className="p-4">Presentation</th>
                <th className="p-4 text-center">Minimum Stock</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {currentProductos.map((prod) => (
                <tr key={prod.codigo_producto} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">{prod.codigo_producto}</td>
                  <td className="p-4">{prod.descripcion}</td>
                  <td className="p-4">{prod.presentacion}</td>
                  <td className="p-4 text-center">{prod.stock_minimo}</td>
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
              {productos.length === 0 && (
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
        {productos.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 bg-[#ed7b07]/2">
            <span className="text-sm text-slate">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, productos.length)} of {productos.length}
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