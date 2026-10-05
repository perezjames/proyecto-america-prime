from fastapi import APIRouter
from app.api.v1.endpoints import (
    productos,
    usuarios,
    ordenes,
    recepciones,
    lotes,
    movimientos,
)

api_router = APIRouter()

api_router.include_router(productos.router, prefix="/productos", tags=["Productos"])
api_router.include_router(usuarios.router, prefix="/usuarios", tags=["Usuarios"])
api_router.include_router(ordenes.router, prefix="/ordenes", tags=["Ordenes Compra"])
api_router.include_router(recepciones.router, prefix="/recepciones", tags=["Recepciones"])
api_router.include_router(lotes.router, prefix="/lotes", tags=["Lotes Inventario"])
api_router.include_router(movimientos.router, prefix="/movimientos", tags=["Movimientos Inventario"])