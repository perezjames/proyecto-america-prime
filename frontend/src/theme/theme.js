import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    background: {
      default: '#F4F7FA', // Fondo gris muy suave como la plantilla
      paper: '#FFFFFF',
    },
    primary: {
      main: '#4680FF', // Azul brillante de Able Pro
      light: '#E9F0FF',
      dark: '#2F53CC',
    },
    text: {
      primary: '#1D2630',
      secondary: '#5B6B79',
    },
  },
  shape: {
    borderRadius: 12, // Bordes redondeados en tarjetas y botones
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
          border: '1px solid #EAEFF4',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
  },
});