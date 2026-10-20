import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Beef,
  Users,
  Boxes,
  ChevronDown,
  ChevronUp,
  LogOut,
  SquareDashed
} from 'lucide-react';

const menuItems = [
  { text: 'Home', icon: Home, path: '/' },
  { 
    text: 'Products', 
    icon: Beef, 
    subItems: [
      { text: 'List', path: '/products/list', badge: 3, badgeColor: 'bg-[#383838] text-white' },
      { text: 'Create', path: '/products/create' },
      { text: 'Edit', path: '/products/edit/*' }
    ]
  },
  { 
    text: 'Users',
    icon: Users,
    subItems: [
      { text: 'List', path: '/users/list', badge: 3, badgeColor: 'bg-[#383838] text-white' },
      { text: 'Create', path: '/users/create' },
      { text: 'Edit', path: '/users/edit/*' }
    ]
  },
  { 
    text: 'Batches', 
    icon: Boxes,
    subItems: [
      { text: 'List', path: '/batches/list' },
      { text: 'Create', path: '/batches/create' },
      { text: 'Edit', path: '/batches/edit/*' }
    ]
  },
  //rutas libres ejemplos
  { 
    text: 'Nombre de la ruta', 
    icon: SquareDashed,
    subItems: [
      { text: 'Earnings', path: '/ingresos/ganancias' }, //List --> /roles/list
      { text: 'Refunds', path: '/ingresos/reembolsos' }, //Create
      { text: 'Refunds', path: '/ingresos/reembolsos' } //Edit
    ]
  },
  { text: 'Promote', icon: Boxes, path: '/promote' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState({ Product: true });
  
  const user = JSON.parse(localStorage.getItem('user')) || { 
    nombre: 'James', 
    rol: 'Software Engineer' 
  };

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <aside className="w-64 border-r border-slate-200 min-h-screen flex flex-col fixed left-0 top-0 z-20 overflow-y-auto bg-white">
      <div className="p-6 border-b border-slate-200 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl text-slate-800 truncate">America Prime <span className="text-xs text-slate-400 font-normal">v1.0</span></h1>
          <button 
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-500 transition-colors ml-2"
            title="Cerrar Sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      <nav className="flex-1 p-4 bg-[#ed7b07]/2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isOpen = openMenus[item.text];

          return (
            <div key={item.text} className="flex flex-col">
              {hasSubItems ? (
                <button
                  onClick={() => toggleMenu(item.text)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors w-full text-black hover:bg-[#ed7b07] hover:text-white group"
                >
                  <div className="flex items-center gap-3">
                    {/* El ícono y texto heredan el color del botón (negro por defecto, blanco en hover) */}
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                    <span className="font-semibold">{item.text}</span>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#ed7b07] text-white font-semibold'
                        : 'text-black hover:bg-[#ed7b07] hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                  <span className="font-semibold">{item.text}</span>
                </NavLink>
              )}

              {/* Sub-items colapsables con líneas de conexión */}
              {hasSubItems && isOpen && (
                <div className="relative mt-1 ml-5 pl-5">
                  <div className="absolute left-0 top-0 bottom-4 w-px bg-slate-200"></div>
                  
                  <div className="flex flex-col gap-1">
                    {item.subItems.map((subItem) => (
                      <NavLink
                        key={subItem.path}
                        to={subItem.path}
                        className={({ isActive }) =>
                          `relative flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive
                              ? 'bg-[#ed7b07] text-white font-semibold'
                              : 'text-black hover:bg-[#ed7b07] hover:text-white'
                          }`
                        }
                      >
                        <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-5 h-px bg-slate-200"></div>
                        <div className="absolute -left-5 top-[-10px] w-px h-[calc(50%+10px)] bg-slate-200 rounded-bl-xl border-b border-l border-slate-200"></div>

                        <span>{subItem.text}</span>
                        
                        {subItem.badge && (
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${subItem.badgeColor}`}>
                            {subItem.badge}
                          </span>
                        )}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}