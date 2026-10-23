import Sidebar from './Sidebar';
import { SidebarProvider, useSidebar } from '../../context/SidebarContext';

function LayoutContent({ children }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      {/* El margen cambia suavemente entre ml-64 (expandido) y ml-20 (colapsado) */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <main className="p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}