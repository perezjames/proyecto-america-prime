from fastapi import APIRouter, HTTPException, status
from typing import List
from app.core.supabase import supabase
from app.schemas.movimientos import MovimientoInventarioCreate, MovimientoInventarioUpdate, MovimientoInventarioResponse

router = APIRouter()

@router.get("/", response_model=List[MovimientoInventarioResponse])
def get_movimientos():
    response = supabase.table("MOVIMIENTOS_INVENTARIO").select("*").execute()
    return response.data

@router.get("/{id_movimiento}", response_model=MovimientoInventarioResponse)
def get_movimiento(id_movimiento: int):
    response = supabase.table("MOVIMIENTOS_INVENTARIO").select("*").eq("id_movimiento", id_movimiento).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Movimiento no encontrado")
    return response.data[0]

@router.post("/", response_model=MovimientoInventarioResponse, status_code=status.HTTP_201_CREATED)
def create_movimiento(movimiento: MovimientoInventarioCreate):
    data = movimiento.model_dump()
    data["fecha_hora"] = data["fecha_hora"].isoformat()
    response = supabase.table("MOVIMIENTOS_INVENTARIO").insert(data).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Error al registrar movimiento")
    return response.data[0]

@router.put("/{id_movimiento}", response_model=MovimientoInventarioResponse)
def update_movimiento(id_movimiento: int, movimiento: MovimientoInventarioUpdate):
    data = movimiento.model_dump(exclude_unset=True)
    if "fecha_hora" in data and data["fecha_hora"]:
        data["fecha_hora"] = data["fecha_hora"].isoformat()
    if not data:
        raise HTTPException(status_code=400, detail="No hay datos para actualizar")
    response = supabase.table("MOVIMIENTOS_INVENTARIO").update(data).eq("id_movimiento", id_movimiento).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Movimiento no encontrado")
    return response.data[0]

@router.delete("/{id_movimiento}")
def delete_movimiento(id_movimiento: int):
    response = supabase.table("MOVIMIENTOS_INVENTARIO").delete().eq("id_movimiento", id_movimiento).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Movimiento no encontrado")
    return {"mensaje": f"Movimiento {id_movimiento} eliminado correctamente"}