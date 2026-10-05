import { Box, Grid, Card, CardContent, Typography, Button, Avatar, InputBase, Paper } from '@mui/material';
import { Search as SearchIcon, Inventory, TrendingUp, LocalShipping, People } from '@mui/icons-material';

export default function DashboardPage() {
  const user = JSON.parse(localStorage.getItem('user')) || { nombre: 'Usuario', rol: 'Administrador' };

  return (
    <Box>
      {/* Banner Azul Promocional / Bienvenida */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #4680FF 0%, #2F53CC 100%)',
          color: 'white',
          mb: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            ¡Bienvenido de nuevo, {user.nombre}!
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Gestiona los productos, recepciones, lotes e inventario general desde un solo lugar.
          </Typography>
          <Button variant="contained" sx={{ mt: 2, backgroundColor: 'white', color: 'primary.dark', '&:hover': { backgroundColor: '#F0F0F0' } }}>
            Ver Lotes
          </Button>
        </Box>
      </Paper>

      {/* Tarjetas de Estadísticas / Métricas */}
      <Grid container spacing={3}>
        {[
          { title: 'Total Productos', value: '1,240', change: '+12.5%', icon: <Inventory color="primary" /> },
          { title: 'Recepciones del Mes', value: '85', change: '+8.2%', icon: <LocalShipping color="primary" /> },
          { title: 'Movimientos Hoy', value: '342', change: '+5.0%', icon: <TrendingUp color="primary" /> },
          { title: 'Usuarios Activos', value: '18', change: '0%', icon: <People color="primary" /> },
        ].map((stat, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">{stat.title}</Typography>
                  <Typography variant="h5" fontWeight="bold" sx={{ my: 0.5 }}>{stat.value}</Typography>
                  <Typography variant="caption" color="success.main" fontWeight="bold">{stat.change}</Typography>
                </Box>
                <Avatar sx={{ backgroundColor: 'primary.light', p: 1 }}>{stat.icon}</Avatar>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}