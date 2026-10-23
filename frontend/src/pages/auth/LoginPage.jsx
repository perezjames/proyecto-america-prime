import { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

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
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl overflow-hidden">
        
        {/* Encabezado */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Login to your account</h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your email below to login to your account
              </p>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="px-6 pb-6">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Campo Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#ed7b07]/30 focus:border-[#ed7b07] transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Campo Contraseña */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#ed7b07]/30 focus:border-[#ed7b07] transition-all pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Separador y Botón inferior estilo card */}
            <div className="pt-4 border-t border-slate-100 mt-6">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#ed7b07] hover:bg-[#d66d06] text-white font-semibold rounded-xl text-sm transition-all shadow-sm active:scale-[0.99]"
              >
                Login
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}