from fastapi import APIRouter, HTTPException, status
from typing import List
from app.core.supabase import supabase
from app.schemas.usuarios import UsuarioCreate, UsuarioUpdate, UsuarioResponse, UsuarioLogin

router = APIRouter()

@router.get("/", response_model=List[UsuarioResponse])
def get_usuarios():
    response = supabase.table("USUARIOS").select("*").execute()
    return response.data

@router.get("/{id_usuario}", response_model=UsuarioResponse)
def get_usuario(id_usuario: int):
    response = supabase.table("USUARIOS").select("*").eq("id_usuario", id_usuario).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return response.data[0]

@router.post("/", response_model=UsuarioResponse, status_code=status.HTTP_201_CREATED)
def create_usuario(usuario: UsuarioCreate):
    response = supabase.table("USUARIOS").insert(usuario.model_dump()).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Error al crear usuario")
    return response.data[0]

@router.put("/{id_usuario}", response_model=UsuarioResponse)
def update_usuario(id_usuario: int, usuario: UsuarioUpdate):
    data = usuario.model_dump(exclude_unset=True)
    if not data:
        raise HTTPException(status_code=400, detail="No hay datos para actualizar")
    response = supabase.table("USUARIOS").update(data).eq("id_usuario", id_usuario).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return response.data[0]

@router.delete("/{id_usuario}")
def delete_usuario(id_usuario: int):
    response = supabase.table("USUARIOS").delete().eq("id_usuario", id_usuario).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"mensaje": f"Usuario {id_usuario} eliminado correctamente"}

@router.post("/login")
def login(credentials: UsuarioLogin):
    response = supabase.table("USUARIOS")\
        .select("*")\
        .eq("email", credentials.email)\
        .eq("password_hash", credentials.password)\
        .execute()
    
    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo o contraseña incorrectos"
        )
    
    usuario = response.data[0]
    return {
        "mensaje": "Inicio de sesión exitoso",
        "usuario": {
            "id_usuario": usuario["id_usuario"],
            "nombre": usuario["nombre"],
            "email": usuario["email"],
            "rol": usuario["rol"]
        }
    }