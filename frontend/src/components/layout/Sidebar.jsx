import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  Truck, 
  Boxes, 
  ArrowLeftRight 
} from 'lucide-react';

const menuItems = [
  { text: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { text: 'Productos', icon: Package, path: '/productos' },
  { text: 'Usuarios', icon: Users, path: '/usuarios' },
  { text: 'Órdenes', icon: ShoppingCart, path: '/ordenes' },
  { text: 'Recepciones', icon: Truck, path: '/recepciones' },
  { text: 'Lotes', icon: Boxes, path: '/lotes' },
  { text: 'Movimientos', icon: ArrowLeftRight, path: '/movimientos' },
  { text: 'Login Temp Guillermo', icon: ArrowLeftRight, path: '/logintempguillermo' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col fixed left-0 top-0 z-20">
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <h1 className="text-xl font-bold text-primary">America Prime <span className="text-xs text-slate-400 font-normal">v1.0</span></h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-light text-primary font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {item.text}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}