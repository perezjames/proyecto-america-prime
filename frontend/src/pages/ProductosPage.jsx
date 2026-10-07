import { useEffect, useState } from 'react';
import { getProductos, createProducto, deleteProducto } from '../services/productosService';
import { Plus, Trash2, X } from 'lucide-react';
import "./styles_juan.css";

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    codigo_producto: '',
    descripcion: '',
    presentacion: '',
    peso_oz: 0,
    peso_gr: 0,
    stock_minimo: 0
  });

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

  const handleCreate = async () => {
    try {
      await createProducto(formData);
      setOpenModal(false);
      setFormData({ codigo_producto: '', descripcion: '', presentacion: '', peso_oz: 0, peso_gr: 0, stock_minimo: 0 });
      fetchProductos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (codigo) => {
    if (confirm(`¿Eliminar producto ${codigo}?`)) {
      await deleteProducto(codigo);
      fetchProductos();
    }
  };

  // Lotes estáticos de prueba
  const LOTES = [
    { id: 101, producto: "Ribeye Lip-On US Prime Angus", presentacion: "Caja x 12 Unidades Vacuum Pack", loteProveedor: "LOT-USA-2026-A1", embalaje: "2026-08-15", vence: "2026-11-15", oz: 16, cantidad: 120, minimo: 30 },
    { id: 102, producto: "Tomahawk Steak Choice Beef", presentacion: "Caja x 8 Unidades Vacuum Pack", loteProveedor: "LOT-USA-2026-T9", embalaje: "2026-08-18", vence: "2026-10-30", oz: 32, cantidad: 22, minimo: 20 },
    { id: 103, producto: "New York Strip Loin Bone-In", presentacion: "Caja x 15 Unidades Vacuum Pack", loteProveedor: "LOT-ARG-2026-N2", embalaje: "2026-08-25", vence: "2026-12-01", oz: 14, cantidad: 85, minimo: 30 },
    { id: 104, producto: "Tenderloin Beef Center Cut (Lomo)", presentacion: "Caja x 10 Unidades", loteProveedor: "LOT-ARG-2026-L5", embalaje: "2026-08-28", vence: "2026-11-20", oz: 8, cantidad: 18, minimo: 30 },
  ];

  const ozAGr = (oz) => (oz * 28.35).toFixed(1);
  const [busqueda, setBusqueda] = useState("");

  const filtrados = LOTES.filter((l) =>
    `${l.id} ${l.producto} ${l.loteProveedor}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-slate-800">Gestión de Productos</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-[#4680FF] hover:bg-[#2F53CC] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Nuevo Producto
        </button>
      </div>

      {/* Tabla de Productos */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase">
            <tr>
              <th className="p-4">Código</th>
              <th className="p-4">Descripción</th>
              <th className="p-4">Presentación</th>
              <th className="p-4">Stock Mínimo</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {productos.map((prod) => (
              <tr key={prod.codigo_producto} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-semibold">{prod.codigo_producto}</td>
                <td className="p-4">{prod.descripcion}</td>
                <td className="p-4">{prod.presentacion}</td>
                <td className="p-4">{prod.stock_minimo}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleDelete(prod.codigo_producto)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {productos.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-slate-400 text-sm">
                  No hay productos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para Crear Producto */}
      {openModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-slate-800">Agregar Nuevo Producto</h2>
              <button onClick={() => setOpenModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Código Producto</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4680FF]"
                  value={formData.codigo_producto}
                  onChange={(e) => setFormData({ ...formData, codigo_producto: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Descripción</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4680FF]"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Presentación</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4680FF]"
                  value={formData.presentacion}
                  onChange={(e) => setFormData({ ...formData, presentacion: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Stock Mínimo</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4680FF]"
                  value={formData.stock_minimo}
                  onChange={(e) => setFormData({ ...formData, stock_minimo: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 text-sm font-semibold bg-[#4680FF] hover:bg-[#2F53CC] text-white rounded-lg transition-colors shadow-sm"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sección Stock en Bodega (Mantiene tu estilos con styles_juan.css) */}
      <section className="stock-card">
        <header className="stock-header">
          <div>
            <h2 className="stock-title">📦 Consultar Stock en Bodega</h2>
            <p className="stock-sub">
              Visualización en tiempo real de lotes, pesos, sanitarios y fechas de vencimiento.
            </p>
          </div>

          <input
            className="stock-search"
            type="search"
            placeholder="Buscar por lote, producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </header>

        <div className="stock-table-wrap">
          <table className="stock-table">
            <thead>
              <tr>
                <th>ID Lote</th>
                <th>Producto / Presentación</th>
                <th>Lote Proveedor</th>
                <th>Fechas (Sacrificio / Venc)</th>
                <th>Peso (Oz / Gr)</th>
                <th className="num">Cantidad Actual</th>
                <th>Estado Stock</th>
              </tr>
            </thead>

            <tbody>
              {filtrados.map((l) => {
                const bajo = l.cantidad <= l.minimo;

                return (
                  <tr key={l.id}>
                    <td className="lote-id">#{l.id}</td>
                    <td>
                      <strong>{l.producto}</strong>
                      <small>{l.presentacion}</small>
                    </td>
                    <td>{l.loteProveedor}</td>
                    <td>
                      Embalaje: {l.embalaje}
                      <span className="vence">Vence: {l.vence}</span>
                    </td>
                    <td>{l.oz} oz / {ozAGr(l.oz)} gr</td>
                    <td className="num"><strong>{l.cantidad}</strong></td>
                    <td>
                      <span className={`badge ${bajo ? "badge-bajo" : "badge-ok"}`}>
                        {bajo ? "⚠ Stock Mínimo" : "✓ Normal"}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {filtrados.length === 0 && (
                <tr>
                  <td colSpan={7} className="vacio">
                    No hay lotes que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}