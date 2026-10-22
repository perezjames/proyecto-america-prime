import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';
import { 
  Home, 
  Beef,
  Users,
  Boxes,
  ChevronRight,
  LogOut,
  ListTodo,
  SquareDashed,
  FileText,
  ChevronsUpDown,
  PanelLeftClose,
  PanelLeft,
  Bell
} from 'lucide-react';

const menuItems = [
  { text: 'Home', icon: Home, path: '/' },
  { 
    text: 'Products', 
    icon: Beef, 
    subItems: [
      { text: 'List', path: '/products/list', badge: 3, badgeColor: 'bg-slate-100 text-slate-700' },
      { text: 'Create', path: '/products/create' },
      { text: 'Edit', path: '/products/edit/*' }
    ]
  },
  { 
    text: 'Users',
    icon: Users,
    subItems: [
      { text: 'List', path: '/users/list', badge: 3, badgeColor: 'bg-slate-100 text-slate-700' },
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
  { 
    text: 'Orders', 
    icon: ListTodo,
    subItems: [
      { text: 'List', path: '/orders/list' }, //List --> /roles/list
      { text: 'Create', path: '/orders/create' }, //Create
      { text: 'Edit', path: '/orders/edit/*' } //Edit
    ]
  },
  { 
    text: 'Receipts', 
    icon: FileText,
    subItems: [
      { text: 'List', path: '/receipts/list' },
      { text: 'Create', path: '/receipts/create' },
      { text: 'Edit', path: '/receipts/edit/*' }
    ]
  },
  { 
    text: 'Movements', 
    icon: SquareDashed,
    subItems: [
      { text: 'List', path: '/movements/list' },
      { text: 'Create', path: '/movements/create' },
      { text: 'Edit', path: '/movements/edit/*' }
    ]
  },
  { text: 'Promote', icon: Boxes, path: '/promote' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const [openMenus, setOpenMenus] = useState({ Products: true });
  const [showUserMenu, setShowUserMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem('user')) || {};

  const toggleMenu = (menu) => {
    if (isCollapsed) toggleSidebar();
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <aside 
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0 z-20 bg-white text-slate-800 transition-all duration-300 ease-in-out`}
    >
      {/* Botón para colapsar / expandir */}
      <div className="p-3 flex items-center justify-between border-b border-slate-100 min-h-[57px]">
        <button 
          onClick={toggleSidebar}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          className={`flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ${
            isCollapsed ? 'w-full py-2.5' : 'p-2'
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            {isCollapsed ? (
              <PanelLeft className="w-5 h-5 shrink-0" />
            ) : (
              <PanelLeftClose className="w-5 h-5 shrink-0" />
            )}
          </div>
        </button>
      </div>

      {/* Navegación Principal */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto min-h-0">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isOpen = openMenus[item.text];

          return (
            <div key={item.text} className="flex flex-col">
              {hasSubItems ? (
                <button
                  onClick={() => toggleMenu(item.text)}
                  title={isCollapsed ? item.text : ''}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full group ${
                    isOpen && !isCollapsed ? 'text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  } ${isCollapsed ? 'justify-center px-0' : 'justify-between'}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-slate-500 group-hover:text-slate-900" strokeWidth={1.75} />
                    </div>
                    {!isCollapsed && <span className="truncate">{item.text}</span>}
                  </div>
                  {!isCollapsed && (
                    <ChevronRight 
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} 
                    />
                  )}
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  title={isCollapsed ? item.text : ''}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#ed7b07] text-white font-semibold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    } ${isCollapsed ? 'justify-center px-0' : 'gap-3'}`
                  }
                >
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  {!isCollapsed && <span className="truncate">{item.text}</span>}
                </NavLink>
              )}

              {/* Sub-items (sólo visibles cuando NO está colapsado) */}
              {hasSubItems && isOpen && !isCollapsed && (
                <div className="relative ml-5 pl-3 my-1 border-l border-slate-200 flex flex-col gap-0.5">
                  {item.subItems.map((subItem) => (
                    <NavLink
                      key={subItem.path}
                      to={subItem.path}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-1.5 rounded-md text-sm transition-colors ${
                          isActive
                            ? 'bg-[#ed7b07] text-white font-semibold'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`
                      }
                    >
                      <span className="truncate">{subItem.text}</span>
                      {subItem.badge && (
                        <span className={`text-xs px-1.5 py-0.5 rounded-full shrink-0 ${subItem.badgeColor}`}>
                          {subItem.badge}
                        </span>
                      )}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer: Perfil de Usuario */}
      <div className="p-3 border-t border-slate-200 relative">
        {showUserMenu && (
          <div className={`absolute bottom-16 ${isCollapsed ? 'left-16 w-48' : 'left-3 right-3'} bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-30 animate-in fade-in slide-in-from-bottom-2 duration-150`}>
            <div className="px-2 py-2 border-b border-slate-100 mb-1">
              <p className="text-sm font-semibold text-slate-800 leading-none">{user.nombre}</p>
              <p className="text-xs text-slate-500 mt-1 truncate">{user.email}</p>
            </div>
            <button
              onClick={() => alert("Notifications")}
              className="w-full flex items-center gap-2 px-2.5 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
            >
              <Bell className="w-4 h-4 shrink-0" />
              <span>Notifications</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-2.5 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Log out</span>
            </button>
          </div>
        )}

        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          title={isCollapsed ? user.nombre : ''}
          className={`w-full flex items-center p-2 rounded-xl hover:bg-slate-100 transition-colors group ${
            isCollapsed ? 'justify-center px-0' : 'justify-between'
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#ed7b07]/10 text-[#ed7b07] flex items-center justify-center font-bold text-sm border border-[#ed7b07]/20 shrink-0">
              {user.nombre?.charAt(0).toUpperCase() || 'U'}
            </div>
            {!isCollapsed && (
              <div className="flex flex-col text-left truncate">
                <span className="text-sm font-semibold text-slate-800 truncate leading-tight">{user.nombre}</span>
                <span className="text-xs text-slate-400 truncate">{user.email}</span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <ChevronsUpDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 shrink-0 ml-1" />
          )}
        </button>
      </div>
    </aside>
  );
}