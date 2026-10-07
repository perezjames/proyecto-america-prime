import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  const isAuthenticated = Boolean(localStorage.getItem('user'));

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-main px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 mb-2">404</h1>
        <h2 className="text-lg font-bold text-slate-700 mb-2">Página no encontrada</h2>
        <p className="text-slate-500 text-sm mb-6">
          La ruta que intentas consultar no existe o ha sido movida.
        </p>
        <Link
          to={isAuthenticated ? "/" : "/login"}
          className="inline-block w-full py-3 px-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
        >
          {isAuthenticated ? "Volver al Dashboard" : "Ir al Inicio de Sesión"}
        </Link>
      </div>
    </div>
  );
}