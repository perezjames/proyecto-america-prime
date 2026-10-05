from fastapi import APIRouter, HTTPException, status
from typing import List
from app.core.supabase import supabase
from app.schemas.recepciones import RecepcionCreate, RecepcionUpdate, RecepcionResponse

router = APIRouter()

@router.get("/", response_model=List[RecepcionResponse])
def get_recepciones():
    response = supabase.table("RECEPCIONES").select("*").execute()
    return response.data

@router.get("/{id_recepcion}", response_model=RecepcionResponse)
def get_recepcion(id_recepcion: int):
    response = supabase.table("RECEPCIONES").select("*").eq("id_recepcion", id_recepcion).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Recepción no encontrada")
    return response.data[0]

@router.post("/", response_model=RecepcionResponse, status_code=status.HTTP_201_CREATED)
def create_recepcion(recepcion: RecepcionCreate):
    response = supabase.table("RECEPCIONES").insert(recepcion.model_dump()).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Error al registrar recepción")
    return response.data[0]

@router.put("/{id_recepcion}", response_model=RecepcionResponse)
def update_recepcion(id_recepcion: int, recepcion: RecepcionUpdate):
    data = recepcion.model_dump(exclude_unset=True)
    if not data:
        raise HTTPException(status_code=400, detail="No hay datos para actualizar")
    response = supabase.table("RECEPCIONES").update(data).eq("id_recepcion", id_recepcion).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Recepción no encontrada")
    return response.data[0]

@router.delete("/{id_recepcion}")
def delete_recepcion(id_recepcion: int):
    response = supabase.table("RECEPCIONES").delete().eq("id_recepcion", id_recepcion).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Recepción no encontrada")
    return {"mensaje": f"Recepción {id_recepcion} eliminada correctamente"}