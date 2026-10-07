import { Package, Truck, TrendingUp, Users } from 'lucide-react';

export default function DashboardPage() {
  const user = JSON.parse(localStorage.getItem('user')) || { nombre: 'Usuario', rol: 'Administrador' };

  const stats = [
    { title: 'Total Productos', value: '1,240', change: '+12.5%', icon: Package },
    { title: 'Recepciones del Mes', value: '85', change: '+8.2%', icon: Truck },
    { title: 'Movimientos Hoy', value: '342', change: '+5.0%', icon: TrendingUp },
    { title: 'Usuarios Activos', value: '18', change: '0%', icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Banner Azul Promocional / Bienvenida */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-[#4680FF] to-[#2F53CC] text-white shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">¡Bienvenido de nuevo, {user.nombre}!</h1>
          <p className="text-white/90 text-sm">
            Gestiona los productos, recepciones, lotes e inventario general desde un solo lugar.
          </p>
          <button className="mt-4 px-4 py-2 bg-white text-[#2F53CC] font-semibold text-sm rounded-lg shadow hover:bg-slate-100 transition-colors">
            Ver Lotes
          </button>
        </div>
      </div>

      {/* Tarjetas de Estadísticas / Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-800 my-1">{stat.value}</p>
                <span className="text-xs font-bold text-emerald-600">{stat.change}</span>
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