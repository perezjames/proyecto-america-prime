import { useEffect, useState } from 'react';
import { getProductos, createProducto, deleteProducto } from '../services/productosService';

export default function ProductosList() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    codigo_producto: '',
    descripcion: '',
    presentacion: '',
    peso_oz: '',
    peso_gr: '',
    stock_minimo: ''
  });

  const cargarProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProducto({
        ...formData,
        peso_oz: parseFloat(formData.peso_oz) || 0,
        peso_gr: parseFloat(formData.peso_gr) || 0,
        stock_minimo: parseInt(formData.stock_minimo) || 0,
      });
      cargarProductos();
      setFormData({
        codigo_producto: '',
        descripcion: '',
        presentacion: '',
        peso_oz: '',
        peso_gr: '',
        stock_minimo: ''
      });
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };

  const handleDelete = async (codigo) => {
    if (confirm(`¿Eliminar producto ${codigo}?`)) {
      await deleteProducto(codigo);
      cargarProductos();
    }
  };

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestión de Productos</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input
          placeholder="Código"
          value={formData.codigo_producto}
          onChange={(e) => setFormData({ ...formData, codigo_producto: e.target.value })}
          required
        />
        <input
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
        />
        <input
          placeholder="Presentación"
          value={formData.presentacion}
          onChange={(e) => setFormData({ ...formData, presentacion: e.target.value })}
        />
        <input
          placeholder="Stock Mínimo"
          type="number"
          value={formData.stock_minimo}
          onChange={(e) => setFormData({ ...formData, stock_minimo: e.target.value })}
        />
        <button type="submit">Agregar Producto</button>
      </form>

      {/* Tabla */}
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Descripción</th>
            <th>Presentación</th>
            <th>Stock Mínimo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.codigo_producto}>
              <td>{prod.codigo_producto}</td>
              <td>{prod.descripcion}</td>
              <td>{prod.presentacion}</td>
              <td>{prod.stock_minimo}</td>
              <td>
                <button onClick={() => handleDelete(prod.codigo_producto)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}