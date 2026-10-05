import { useEffect, useState } from 'react';
import { 
  Typography, Button, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, 
  DialogContent, TextField, DialogActions, Box 
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { getProductos, createProducto, deleteProducto } from '../services/productosService';

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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Gestión de Productos</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => setOpenModal(true)}
        >
          Nuevo Producto
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Código</strong></TableCell>
              <TableCell><strong>Descripción</strong></TableCell>
              <TableCell><strong>Presentación</strong></TableCell>
              <TableCell><strong>Stock Mínimo</strong></TableCell>
              <TableCell align="center"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((prod) => (
              <TableRow key={prod.codigo_producto}>
                <TableCell>{prod.codigo_producto}</TableCell>
                <TableCell>{prod.descripcion}</TableCell>
                <TableCell>{prod.presentacion}</TableCell>
                <TableCell>{prod.stock_minimo}</TableCell>
                <TableCell align="center">
                  <IconButton color="error" onClick={() => handleDelete(prod.codigo_producto)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal / Dialog para crear producto */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Agregar Nuevo Producto</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1, minWidth: 350 }}>
          <TextField 
            label="Código Producto" 
            fullWidth 
            value={formData.codigo_producto} 
            onChange={(e) => setFormData({ ...formData, codigo_producto: e.target.value })} 
          />
          <TextField 
            label="Descripción" 
            fullWidth 
            value={formData.descripcion} 
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} 
          />
          <TextField 
            label="Presentación" 
            fullWidth 
            value={formData.presentacion} 
            onChange={(e) => setFormData({ ...formData, presentacion: e.target.value })} 
          />
          <TextField 
            label="Stock Mínimo" 
            type="number" 
            fullWidth 
            value={formData.stock_minimo} 
            onChange={(e) => setFormData({ ...formData, stock_minimo: parseInt(e.target.value) || 0 })} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleCreate}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}