import { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, InputAdornment, IconButton, Alert } from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

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
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'background.default' }}>
      <Card sx={{ maxWidth: 400, width: '100%', p: 2 }}>
        <CardContent>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <LockOutlined sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h5" fontWeight="bold">Iniciar Sesión</Typography>
            <Typography variant="body2" color="text.secondary">Aplicación web para la gestión de inventario y operaciones de America Prime</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleLogin}>
            <TextField
              label="Correo Electrónico"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 3 }}>
              Ingresar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}