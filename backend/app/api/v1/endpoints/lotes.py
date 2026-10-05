from fastapi import APIRouter, HTTPException, status
from typing import List
from app.core.supabase import supabase
from app.schemas.lotes import LoteInventarioCreate, LoteInventarioUpdate, LoteInventarioResponse

router = APIRouter()

@router.get("/", response_model=List[LoteInventarioResponse])
def get_lotes():
    response = supabase.table("LOTES_INVENTARIO").select("*").execute()
    return response.data

@router.get("/{id_lote_interno}", response_model=LoteInventarioResponse)
def get_lote(id_lote_interno: int):
    response = supabase.table("LOTES_INVENTARIO").select("*").eq("id_lote_interno", id_lote_interno).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Lote no encontrado")
    return response.data[0]

@router.post("/", response_model=LoteInventarioResponse, status_code=status.HTTP_201_CREATED)
def create_lote(lote: LoteInventarioCreate):
    data = lote.model_dump()
    for key in ["fecha_sacrificio", "fecha_empaque", "fecha_vencimiento"]:
        if data.get(key):
            data[key] = str(data[key])
    response = supabase.table("LOTES_INVENTARIO").insert(data).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Error al crear lote de inventario")
    return response.data[0]

@router.put("/{id_lote_interno}", response_model=LoteInventarioResponse)
def update_lote(id_lote_interno: int, lote: LoteInventarioUpdate):
    data = lote.model_dump(exclude_unset=True)
    for key in ["fecha_sacrificio", "fecha_empaque", "fecha_vencimiento"]:
        if key in data and data[key]:
            data[key] = str(data[key])
    if not data:
        raise HTTPException(status_code=400, detail="No hay datos para actualizar")
    response = supabase.table("LOTES_INVENTARIO").update(data).eq("id_lote_interno", id_lote_interno).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Lote no encontrado")
    return response.data[0]

@router.delete("/{id_lote_interno}")
def delete_lote(id_lote_interno: int):
    response = supabase.table("LOTES_INVENTARIO").delete().eq("id_lote_interno", id_lote_interno).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Lote no encontrado")
    return {"mensaje": f"Lote {id_lote_interno} eliminado correctamente"}