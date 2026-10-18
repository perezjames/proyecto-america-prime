import logging

from fastapi import APIRouter, HTTPException, status
from postgrest.exceptions import APIError

from app.core.supabase import supabase

router = APIRouter()
logger = logging.getLogger(__name__)


@router.get("/", response_model=dict[str, int])
def get_dashboard():
    tables = {
        "lotes": "LOTES_INVENTARIO",
        "movimientos": "MOVIMIENTOS_INVENTARIO",
        "ordenes": "ORDENES_COMPRA",
        "productos": "PRODUCTOS",
        "recepciones": "RECEPCIONES",
        "roles": "ROLES",
        "usuarios": "USUARIOS",
    }
    counts = {}
    for key, table in tables.items():
        try:
            response = supabase.table(table).select(
                "*", count="exact", head=True
            ).execute()
        except APIError as exc:
            logger.exception("Error al contar registros de %s", table)
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="No se pudieron consultar los totales del dashboard",
            ) from exc
        if response.count is None:
            logger.error("Supabase no devolvio el conteo de %s", table)
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="No se recibieron los totales del dashboard",
            )
        counts[key] = response.count
    return counts
