import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsuarios, deleteUsuario } from '../../services/usuariosService';
import { getRoles } from '../../services/rolesService';
import { Plus, Trash2, Edit2, ChevronLeft, ChevronRight, Shield } from 'lucide-react';

export default function UserListPage() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchData = async () => {
    try {
      // Obtenemos usuarios y roles al mismo tiempo
      const [usersData, rolesData] = await Promise.all([
        getUsuarios(),
        getRoles() 
      ]);
      setUsuarios(usersData);
      setRoles(rolesData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id_usuario) => {
    if (window.confirm(`¿Estás seguro de eliminar este usuario?`)) {
      try {
        await deleteUsuario(id_usuario);
        fetchData();
      } catch (err) {
        console.error("Error al eliminar", err);
      }
    }
  };

  // Función para obtener el nombre del rol por su ID
  const getRoleName = (rol_id) => {
    const role = roles.find(r => r.id === rol_id);
    return role ? role.rol : 'Desconocido';
  };

  // Paginación
  const totalPages = Math.ceil(usuarios.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsuarios = usuarios.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl text-slate-800">User Management</h1>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden flex flex-col h-full">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#ed7b07] text-xs font-semibold text-white">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Mail</th>
                <th className="p-4">Role</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {currentUsuarios.map((user) => {
                const roleName = getRoleName(user.rol_id);
                return (
                  <tr key={user.id_usuario} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">{user.nombre}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{roleName}</td>
                    <td className="p-4 flex justify-center gap-2">
                      <button
                        onClick={() => navigate(`/users/edit/${user.id_usuario}`)}
                        className="p-1.5 text-[#ed7b07] hover:bg-[#ffe5d1] rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id_usuario)}
                        className="p-1.5 text-[#ed7b07] hover:bg-[#ffe5d1] rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {usuarios.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-slate-400 text-sm">
                    There are no registered users.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {usuarios.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 bg-[#ed7b07]/2">
            <span className="text-sm text-slate">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, usuarios.length)} of {usuarios.length}
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