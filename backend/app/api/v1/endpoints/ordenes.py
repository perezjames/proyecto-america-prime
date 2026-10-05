from fastapi import APIRouter, HTTPException, status
from typing import List
from app.core.supabase import supabase
from app.schemas.ordenes import OrdenCompraCreate, OrdenCompraUpdate, OrdenCompraResponse

router = APIRouter()

@router.get("/", response_model=List[OrdenCompraResponse])
def get_ordenes():
    response = supabase.table("ORDENES_COMPRA").select("*").execute()
    return response.data

@router.get("/{id_orden}", response_model=OrdenCompraResponse)
def get_orden(id_orden: int):
    response = supabase.table("ORDENES_COMPRA").select("*").eq("id_orden", id_orden).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Orden de compra no encontrada")
    return response.data[0]

@router.post("/", response_model=OrdenCompraResponse, status_code=status.HTTP_201_CREATED)
def create_orden(orden: OrdenCompraCreate):
    data = orden.model_dump()
    data["fecha_orden"] = str(data["fecha_orden"])
    response = supabase.table("ORDENES_COMPRA").insert(data).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Error al crear orden de compra")
    return response.data[0]

@router.put("/{id_orden}", response_model=OrdenCompraResponse)
def update_orden(id_orden: int, orden: OrdenCompraUpdate):
    data = orden.model_dump(exclude_unset=True)
    if "fecha_orden" in data and data["fecha_orden"]:
        data["fecha_orden"] = str(data["fecha_orden"])
    if not data:
        raise HTTPException(status_code=400, detail="No hay datos para actualizar")
    response = supabase.table("ORDENES_COMPRA").update(data).eq("id_orden", id_orden).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Orden de compra no encontrada")
    return response.data[0]

@router.delete("/{id_orden}")
def delete_orden(id_orden: int):
    response = supabase.table("ORDENES_COMPRA").delete().eq("id_orden", id_orden).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Orden de compra no encontrada")
    return {"mensaje": f"Orden de compra {id_orden} eliminada correctamente"}