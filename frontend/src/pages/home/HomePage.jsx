import { useEffect, useState } from 'react';
import { getDashboard } from '../../services/dashboardService';

export default function HomePage() {
  const user = JSON.parse(localStorage.getItem('user')) || { nombre: 'name', rol: 'role' };
  const [counts, setCounts] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const fetchCounts = async () => {
      try {
        const data = await getDashboard();
        if (active) setCounts(data);
      } catch (err) {
        console.error('Error al cargar los totales del dashboard:', err);
        if (active) setError('No se pudieron cargar los totales. Intenta recargar la página.');
      }
    };

    fetchCounts();
    return () => {
      active = false;
    };
  }, []);

  const stats = [
    { title: 'Batches', value: counts?.lotes },
    { title: 'Movements', value: counts?.movimientos },
    { title: 'Orders', value: counts?.ordenes },
    { title: 'Products', value: counts?.productos },
    { title: 'Receipts', value: counts?.recepciones },
    { title: 'Roles', value: counts?.roles },
    { title: 'Users', value: counts?.usuarios },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="w-16 h-16 rounded-full bg-[#ed7b07] mb-2 text-white text-3xl flex items-center justify-center flex-shrink-0">
          {user.nombre.charAt(0)}
        </div>
        <h1 className="text-3xl mb-2">Welcome back, <span className="font-semibold">{user.nombre.split(' ')[0]}</span>!</h1>
        <h1 className="text-3xl mb-2">Your role is <span className="font-semibold">{user.rol}</span></h1>

      </div>

      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

      <div aria-busy={!counts && !error} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          return (
            <div key={idx} className="p-5 rounded-xl border border-slate-300 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">{stat.title}</p>
                <p className="text-2xl text-slate-800 my-1">
                  {counts ? stat.value : error ? '—' : '0'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}