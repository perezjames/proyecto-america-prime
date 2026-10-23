import { AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl text-slate-800 mb-2">404</h1>
        <h2 className="text-lg font-bold text-slate-700 mb-2">Página no encontrada</h2>
        <p className="text-slate-500 text-sm">La ruta que intentas consultar no existe</p>
      </div>
    </div>
  );
}