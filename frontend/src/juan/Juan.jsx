import './styles_juan.css';
import StockBodega from "./StockBodega";

export default function Juan() {
  return (
    <div className="juan-container">
      <h1>Página de Juan</h1>
      <p>Bienvenido a la ruta de Juan</p>
      <p>Bienvenido a la ruta de Juan</p>

      <table border="1">
        <tr>
          <th>Nombre</th>
          <th>Edad</th>
          <th>País</th>
        </tr>
        <tr>
          <td>Juan</td>
          <td>25</td>
          <td>México</td>
        </tr>
        <tr>
          <td>Ana</td>
          <td>30</td>
          <td>España</td>
        </tr>
      </table>
    </div>
  );
}