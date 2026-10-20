# Proyecto America Prime

Aplicación web para la gestión de inventario y operaciones de America Prime

## Estructura

```
├── backend/
│   └── app/
│       ├── api/v1/endpoints/
│       ├── core/
│       ├── schemas/
│       └── main.py
└── frontend/
    ├── public/
    └── src/
        ├── api/axios.js
        └── assets/
        │   ├── logo-ap-negativo.svg
        │   ├── logo-ap-positivo.svg
    │   │   └── logo-ue.webp
        ├── components/layout/
        │   ├── Layout.jsx
    │   │   └── Sidebar.jsx
        ├── pages/
        │   ├── auth/
                products/
    │   │   └── home/
            ...
        ├── routes/
            └── AppRouter.jsx
        ├── services/
            └── ...
        ├── App.jsx
        ├── index.css
        └── main.jsx
```