import { useState } from "react";
import "./styles_juan.css";

// Los datos del stock
const LOTES = [
  { id: 101, producto: "Ribeye Lip-On US Prime Angus", presentacion: "Caja x 12 Unidades Vacuum Pack", loteProveedor: "LOT-USA-2026-A1", embalaje: "2026-08-15", vence: "2026-11-15", oz: 16, cantidad: 120, minimo: 30 },
  { id: 102, producto: "Tomahawk Steak Choice Beef", presentacion: "Caja x 8 Unidades Vacuum Pack", loteProveedor: "LOT-USA-2026-T9", embalaje: "2026-08-18", vence: "2026-10-30", oz: 32, cantidad: 22, minimo: 20 },
  { id: 103, producto: "New York Strip Loin Bone-In", presentacion: "Caja x 15 Unidades Vacuum Pack", loteProveedor: "LOT-ARG-2026-N2", embalaje: "2026-08-25", vence: "2026-12-01", oz: 14, cantidad: 85, minimo: 30 },
  { id: 104, producto: "Tenderloin Beef Center Cut (Lomo)", presentacion: "Caja x 10 Unidades", loteProveedor: "LOT-ARG-2026-L5", embalaje: "2026-08-28", vence: "2026-11-20", oz: 8, cantidad: 18, minimo: 30 },
];

// El convertidor
const ozAGr = (oz) => (oz * 28.35).toFixed(1);

export default function StockBodega() {
  // 3. La caja con memoria: guarda lo que se escribe en el buscador
  const [busqueda, setBusqueda] = useState("");

  // 4. El colador: deja pasar solo los lotes que contienen lo buscado
  const filtrados = LOTES.filter((l) =>
    `${l.id} ${l.producto} ${l.loteProveedor}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  // 5. Lo que se ve en pantalla
  return (
    <section className="stock-card">
      <header className="stock-header">
        <div>
          <h2 className="stock-title">📦 Consultar Stock en Bodega</h2>
          <p className="stock-sub">
            Visualización en tiempo real de lotes, pesos, sanitarios y fechas de vencimiento.
          </p>
        </div>

        <input
          className="stock-search"
          type="search"
          placeholder="Buscar por lote, producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </header>

      <div className="stock-table-wrap">
        <table className="stock-table">
          <thead>
            <tr>
              <th>ID Lote</th>
              <th>Producto / Presentación</th>
              <th>Lote Proveedor</th>
              <th>Fechas (Sacrificio / Venc)</th>
              <th>Peso (Oz / Gr)</th>
              <th className="num">Cantidad Actual</th>
              <th>Estado Stock</th>
            </tr>
          </thead>

          <tbody>
            {filtrados.map((l) => {
              const bajo = l.cantidad <= l.minimo;

              return (
                <tr key={l.id}>
                  <td className="lote-id">#{l.id}</td>
                  <td>
                    <strong>{l.producto}</strong>
                    <small>{l.presentacion}</small>
                  </td>
                  <td>{l.loteProveedor}</td>
                  <td>
                    Embalaje: {l.embalaje}
                    <span className="vence">Vence: {l.vence}</span>
                  </td>
                  <td>{l.oz} oz / {ozAGr(l.oz)} gr</td>
                  <td className="num"><strong>{l.cantidad}</strong></td>
                  <td>
                    <span className={`badge ${bajo ? "badge-bajo" : "badge-ok"}`}>
                      {bajo ? "⚠ Stock Mínimo" : "✓ Normal"}
                    </span>
                  </td>
                </tr>
              );
            })}

            {filtrados.length === 0 && (
              <tr>
                <td colSpan={7} className="vacio">
                  No hay lotes que coincidan con la búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}