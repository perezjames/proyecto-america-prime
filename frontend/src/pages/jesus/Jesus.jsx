import { useState } from 'react';
import './styles_jesus.css';

export default function Jesus() {
  const [abierto, setAbierto] = useState(false);
  const [seleccionados, setSeleccionados] = useState([]);

  // Función para manejar la selección de los lotes de carnes de America Prime
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSeleccionados([...seleccionados, value]);
    } else {
      setSeleccionados(seleccionados.filter((item) => item !== value));
    }
  };

  return (
    <div className="card">
      <h1>Registrar Salida de Productos</h1>
      <p>Despacho Fisico de unidades. Genera Automaticamente Alerta de Stock Mínimo si desciende del umbral</p>

      <form action="#" method="POST">
        {/* Selección múltiple de cortes de America Prime */}
        <div className="campo">
          <label>Seleccionar Lotes de Inventario</label>
          
          <div className="select-personalizado">
            <div 
              className="select-trigger" 
              onClick={() => setAbierto(!abierto)}
            >
              <span className="texto-seleccionado">
                {seleccionados.length > 0 
                  ? seleccionados.join(', ') 
                  : '-- Elija lotes de America Prime --'}
              </span>
              <span className={`flecha ${abierto ? 'girar' : ''}`}>▼</span>
            </div>

            {abierto && (
              <div className="cajon-desplegable">
                <label className="opcion-item">
                  <input 
                    type="checkbox" 
                    name="lotes" 
                    value="Ribeye Prime" 
                    onChange={handleCheckboxChange}
                  /> Ribeye America Prime (Disp: 35 kg)
                </label>
                <label className="opcion-item">
                  <input 
                    type="checkbox" 
                    name="lotes" 
                    value="New York Strip Prime" 
                    onChange={handleCheckboxChange}
                  /> New York Strip America Prime (Disp: 20 kg)
                </label>
                <label className="opcion-item">
                  <input 
                    type="checkbox" 
                    name="lotes" 
                    value="Tomahawk Prime" 
                    onChange={handleCheckboxChange}
                  /> Tomahawk America Prime (Disp: 15 kg)
                </label>
                <label className="opcion-item">
                  <input 
                    type="checkbox" 
                    name="lotes" 
                    value="Picaña Prime" 
                    onChange={handleCheckboxChange}
                  /> Picaña America Prime (Disp: 40 kg)
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Campo de cantidad a despachar */}
        <div className="campo">
          <label htmlFor="cantidad">Cantidad a Despachar (Unidades / kg)</label>
          <input 
            type="number" 
            id="cantidad" 
            name="cantidad" 
            placeholder="ej. 15" 
            className="input-cantidad"
          />
        </div>

        <button type="submit" className="btn-confirmar">
          Confirmar Registrar Salida
        </button>
      </form>
    </div>
  );
}