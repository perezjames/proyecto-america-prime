import Sidebar from './Sidebar';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || { nombre: 'Usuario', rol: 'Admin' };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-background-main">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        {/* Navbar Superior */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="text-sm text-slate-500">Gestión de inventario y operaciones de America Prime</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold">
                {user.nombre.charAt(0)}
              </div>
              <div className="text-xs">
                <p className="font-semibold text-slate-700">{user.nombre}</p>
                <p className="text-slate-400">{user.rol}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
              title="Cerrar Sesión"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Contenido de la Página */}
        <main className="p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}