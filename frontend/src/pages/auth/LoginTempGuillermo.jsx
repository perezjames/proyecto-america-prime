import './styles_guillermo.css';
import logo from '../../assets/logo-ap-negativo.svg';

export default function Guillermo() {
  return (
    <div className="background-container">
      <img src={logo} alt="Logo" className="logo" />
      <div className="login-container">
        <h1 className="title">Iniciar Sesión</h1>
        <input type="text" placeholder="Usuario o Correo" className="login-input" />
        <input type="password" placeholder="Contraseña" className="login-input" />
        <button className="login-button">Entrar</button>
      </div>
    </div>
  );
}