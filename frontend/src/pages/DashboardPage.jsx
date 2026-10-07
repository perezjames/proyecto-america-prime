import { Package, Truck, TrendingUp, Users } from 'lucide-react';

export default function DashboardPage() {
  const user = JSON.parse(localStorage.getItem('user')) || { nombre: 'Usuario', rol: 'Administrador' };

  const stats = [
    { title: 'Productos', value: '0', icon: Package },
    { title: 'Recepciones', value: '0', icon: Truck },
    { title: 'Movimientos', value: '0', icon: TrendingUp },
    { title: 'Usuarios Act.', value: '0', icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Banner Azul Promocional / Bienvenida */}
      <div className="p-8 rounded-2xl border border-slate-300 bg-white text-black flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">¡Bienvenido de nuevo, {user.nombre}!</h1>
          <p className="text-black/90 text-sm">
            Gestiona los productos, recepciones, lotes e inventario general desde un solo lugar
          </p>
        </div>
      </div>

      {/* Tarjetas de Estadísticas / Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-300 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-800 my-1">{stat.value}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#E9F0FF] text-[#4680FF] flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}