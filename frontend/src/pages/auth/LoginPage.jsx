import { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import logo from '../../assets/logo-ap-negativo.svg';

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/usuarios/login', { email, password });
      localStorage.setItem('user', JSON.stringify(res.data.usuario));
      if (onLoginSuccess) onLoginSuccess(res.data.usuario);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-50 text-[#4680FF] rounded-xl flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-10">Iniciar Sesión</h2>
          <img src={logo} alt="America Prime Logo" className="mb-10" />
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Correo</label>
            <input
              type="email"
              className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4680FF] focus:border-transparent"
              placeholder="name@ap.co"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4680FF] focus:border-transparent pr-10"
                placeholder="name"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-[#4680FF] hover:bg-[#2F53CC] text-white font-semibold rounded-lg text-sm shadow transition-colors"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}