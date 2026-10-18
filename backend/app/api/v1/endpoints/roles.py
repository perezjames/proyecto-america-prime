from fastapi import APIRouter, HTTPException, status
from postgrest.exceptions import APIError
from typing import List
from app.core.supabase import supabase
from app.schemas.roles import RolCreate, RolUpdate, RolResponse

router = APIRouter()


@router.get("/", response_model=List[RolResponse])
def get_roles():
    response = supabase.table("ROLES").select("*").execute()
    return response.data


@router.get("/{id}", response_model=RolResponse)
def get_rol(id: int):
    response = supabase.table("ROLES").select("*").eq("id", id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Rol no encontrado")
    return response.data[0]


@router.post("/", response_model=RolResponse, status_code=status.HTTP_201_CREATED)
def create_rol(rol: RolCreate):
    response = supabase.table("ROLES").insert(rol.model_dump()).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Error al crear rol")
    return response.data[0]


@router.put("/{id}", response_model=RolResponse)
def update_rol(id: int, rol: RolUpdate):
    data = rol.model_dump(exclude_unset=True)
    if not data:
        raise HTTPException(status_code=400, detail="No hay datos para actualizar")
    if data["rol"] is None:
        raise HTTPException(status_code=400, detail="rol no puede ser nulo")
    response = supabase.table("ROLES").update(data).eq("id", id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Rol no encontrado")
    return response.data[0]


@router.delete("/{id}")
def delete_rol(id: int):
    try:
        response = supabase.table("ROLES").delete().eq("id", id).execute()
    except APIError as exc:
        if exc.code == "23503":
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="No se puede eliminar un rol asociado a usuarios"
            ) from exc
        raise
    if not response.data:
        raise HTTPException(status_code=404, detail="Rol no encontrado")
    return {"mensaje": f"Rol {id} eliminado correctamente"}
