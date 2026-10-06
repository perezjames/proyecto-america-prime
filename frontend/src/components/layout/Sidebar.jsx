import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Box } from '@mui/material';
import { 
  Inventory as InventoryIcon, 
  People as PeopleIcon, 
  ShoppingCart as ShoppingCartIcon, 
  LocalShipping as LocalShippingIcon, 
  QrCode as QrCodeIcon, 
  SwapHoriz as SwapHorizIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Productos/Juan', icon: <InventoryIcon />, path: '/productos' },
  { text: 'Usuarios', icon: <PeopleIcon />, path: '/usuarios' },
  { text: 'Órdenes de Compra', icon: <ShoppingCartIcon />, path: '/ordenes' },
  { text: 'Recepciones', icon: <LocalShippingIcon />, path: '/recepciones' },
  { text: 'Lotes Inventario', icon: <QrCodeIcon />, path: '/lotes' },
  { text: 'Movimientos', icon: <SwapHorizIcon />, path: '/movimientos' },
  { text: 'Jesus', icon: <SwapHorizIcon />, path: '/jesus' },
  { text: 'Guillermo', icon: <SwapHorizIcon />, path: '/guillermo' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Sistema Inventario
        </Typography>
      </Toolbar>
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton 
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}