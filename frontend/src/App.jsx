import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Juan from './juan/Juan';
import Jesus from './jesus/Jesus';
import Guillermo from './guillermo/Guillermo';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        <Link to="/juan">Juan</Link>
        <Link to="/jesus">Jesús</Link>
        <Link to="/guillermo">Guillermo</Link>
      </nav>

      <Routes>
        <Route path="/juan" element={<Juan />} />
        <Route path="/jesus" element={<Jesus />} />
        <Route path="/guillermo" element={<Guillermo />} />
        <Route path="*" element={<h2>Selecciona una ruta arriba</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;