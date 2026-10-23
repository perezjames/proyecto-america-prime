# Proyecto America Prime

Aplicación web para la gestión de inventario y operaciones de America Prime

## Estructura

```
proyecto-america-prime/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── endpoints/
│   │   │       │   ├── dashboard.py
│   │   │       │   ├── lotes.py
│   │   │       │   ├── movimientos.py
│   │   │       │   ├── ordenes.py
│   │   │       │   ├── productos.py
│   │   │       │   ├── recepciones.py
│   │   │       │   ├── roles.py
│   │   │       │   └── usuarios.py
│   │   │       └── router.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── supabase.py
│   │   ├── schemas/
│   │   │   ├── lotes.py
│   │   │   ├── movimientos.py
│   │   │   ├── ordenes.py
│   │   │   ├── productos.py
│   │   │   ├── recepciones.py
│   │   │   ├── roles.py
│   │   │   └── usuarios.py
│   │   ├── services/
│   │   │   ├── inventario_service.py
│   │   │   └── productos_service.py
│   │   ├── __init__.py
│   │   └── main.py
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── .python-version
│   ├── pyproject.toml
│   ├── requirements.txt
│   └── uv.lock
├── frontend/
│   ├── public/
│   │   └── ap-favicon.png
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── assets/
│   │   │   ├── ap-background.png
│   │   │   ├── ap-prime.webp
│   │   │   ├── logo-ap-negativo.svg
│   │   │   ├── logo-ap-positivo.svg
│   │   │   └── logo-ue.webp
│   │   ├── components/
│   │   │   └── layout/
│   │   │       ├── Layout.jsx
│   │   │       └── Sidebar.jsx
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   └── LoginPage.jsx
│   │   │   ├── batches/
│   │   │   │   ├── Create.jsx
│   │   │   │   ├── Edit.jsx
│   │   │   │   └── List.jsx
│   │   │   ├── home/
│   │   │   │   └── HomePage.jsx
│   │   │   ├── orders/
│   │   │   ├── products/
│   │   │   │   ├── Create.jsx
│   │   │   │   ├── Edit.jsx
│   │   │   │   └── List.jsx
│   │   │   ├── roles/
│   │   │   ├── users/
│   │   │   │   ├── Create.jsx
│   │   │   │   ├── Edit.jsx
│   │   │   │   └── List.jsx
│   │   │   ├── found/
│   │   │   │   └── NotFoundPage.jsx
│   │   │   ├── OrdenesPage.jsx
│   │   │   └── RecepcionesPage.jsx
│   │   ├── routes/
│   │   │   └── AppRouter.jsx
│   │   ├── services/
│   │   │   ├── dashboardService.js
│   │   │   ├── lotesService.js
│   │   │   ├── movimientosService.js
│   │   │   ├── ordenesService.js
│   │   │   ├── productosService.js
│   │   │   ├── recepcionesService.js
│   │   │   ├── rolesService.js
│   │   │   └── usuariosService.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
└── README.md
```