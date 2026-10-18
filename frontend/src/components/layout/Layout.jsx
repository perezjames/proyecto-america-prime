import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <main className="p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}