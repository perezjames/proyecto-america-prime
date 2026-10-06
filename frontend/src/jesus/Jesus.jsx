import React, { useState } from 'react';
import './styles_jesus.css';
import './style_jesus2.css'; 

export default function Jesus() {
  // --- ESTADOS Y LÓGICA DEL FORMULARIO 1 (Salida de Producto) ---
  const [lote, setLote] = useState('opcion');
  const [cantidad, setCantidad] = useState('');

  const messageConfirmar = () => {
    if (lote === 'opcion') {
      alert("¡Error! Por favor selecciona un lote de inventario disponible.");
      return;
    }

    if (cantidad === '' || Number(cantidad) <= 0) {
      alert("¡Error! Por favor ingresa una cantidad válida de unidades a despachar.");
      return;
    }

    alert(`¡Éxito! El lote fue despachado exitosamente.\n- Lote: ${lote}\n- Unidades despachadas: ${cantidad}`);
  };


  // --- ESTADOS Y LÓGICA DEL FORMULARIO 2 (Registro de Baja) ---
  const [loteBaja, setLoteBaja] = useState('');
  const [cantidadBaja, setCantidadBaja] = useState('');
  const [motivoBaja, setMotivoBaja] = useState('');

  const handleSubmitBaja = (e) => {
    e.preventDefault();
    if (!loteBaja) {
      alert("¡Error! Por favor selecciona un lote afectado.");
      return;
    }
    if (cantidadBaja === '' || Number(cantidadBaja) <= 0) {
      alert("¡Error! Por favor ingresa una cantidad válida para dar de baja.");
      return;
    }
    alert(`¡Éxito! Baja registrada correctamente.\n- Lote: ${loteBaja}\n- Unidades dadas de baja: ${cantidadBaja}\n- Motivo: ${motivoBaja}`);
  };


  return (
    <div>
      {/* =================================================== */}
      {/* TÍTULO DE LA SECCIÓN DE SALIDA DE PRODUCTOS         */}
      {/* =================================================== */}
      <h1 style={{ textAlign: 'center', margin: '20px 0 20px 0', color: '#333', fontSize: '26px' }}>
        Sección de Salida de Productos
      </h1>

      {/* =================================================== */}
      {/* FORMULARIO 1: Registrar Salida Del Producto        */}
      {/* =================================================== */}
      <div className="jesus-container">
        <h1 className="title2">Registrar Salida Del Producto</h1>
        <p className="parrafo">Despacho Físico de Unidades. Genera Automáticamente Alerta Stock Minimo si Desciende del Umbral</p>
        
        <h2 className="title3">Seleccionar Lote de Inventario</h2>
        <select 
          id="opciones" 
          name="opciones" 
          value={lote} 
          onChange={(e) => setLote(e.target.value)}
        >
          <option value="opcion">--Elija un Lote Disponible--</option>
          <option value="opcion1">Lote # 111 - Ribeye Lip-On US Prime Angus (Stock Actual): 52</option>
          <option value="opcion2">Lote # 112 - Tomahawk Steak Choice Beef (Stock Minimo): 73</option>
          <option value="opcion3">Lote # 113 - New York Strip Loin Bone-In (Stock Minimo): 94</option>
          <option value="opcion4">Lote # 114 - Tenderloin Beef Center Cut (Lomo) (Stock Minimo): 18</option>
        </select>
        
        <h2 className="title4">Cantidad a Despachar (Unidades):</h2>
        <label htmlFor="num" className="label-unidad">Ingrese la unidad:</label>
        <input 
          type="number" 
          id="num" 
          name="num" 
          placeholder="Ej. 10"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />

        <button type="button" onClick={messageConfirmar} className="btn-confirmar">
          Confirmar Registrar Salida
        </button>
      </div>

      {/* =================================================== */}
      {/* TÍTULO DE LA SECCIÓN DE BAJAS                      */}
      {/* =================================================== */}
      <h1 style={{ textAlign: 'center', margin: '40px 0 20px 0', color: '#333', fontSize: '26px' }}>
        Sección de Registrar Bajas de Unidades
      </h1>

      {/* =================================================== */}
      {/* FORMULARIO 2: Registrar Baja de Unidades            */}
      {/* =================================================== */}
      <div className="form-container" style={{ marginTop: '0' }}>
        
        <div className="form-header">
          <span className="header-icon">📉</span>
          <h2>Registrar Baja de Unidades</h2>
        </div>
        <p className="form-description">
          Registro de pérdidas, ruptura de empaque vacuum, vencimiento o fallos de cadena de frío.
        </p>

        <form onSubmit={handleSubmitBaja}>
          
          <div className="form-group">
            <label htmlFor="lote">Seleccionar Lote Afectado</label>
            <select 
              id="lote" 
              name="lote" 
              value={loteBaja} 
              onChange={(e) => setLoteBaja(e.target.value)}
              required
            >
              <option value="" disabled>-- Seleccionar Lote --</option>
              <option value="lote-001">Lote 001 - VAC-2026</option>
              <option value="lote-002">Lote 002 - VAC-2026</option>
              <option value="lote-003">Lote 003 - VAC-2026</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cantidad">Cantidad a Dar de Baja</label>
            <input 
              type="number" 
              id="cantidad" 
              name="cantidad" 
              placeholder="ej. 3" 
              min="1" 
              value={cantidadBaja}
              onChange={(e) => setCantidadBaja(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="motivo">Motivo de la Baja</label>
            <textarea 
              id="motivo" 
              name="motivo" 
              rows="4" 
              placeholder="Describa el motivo (ej. Golpe en empaque al vacío durante manipulación en bodega)..." 
              value={motivoBaja}
              onChange={(e) => setMotivoBaja(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            <span>📉</span> Registrar Baja en Sistema
          </button>

        </form>
      </div>

    </div>
  );
}