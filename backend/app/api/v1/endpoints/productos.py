from fastapi import APIRouter, HTTPException, status
from typing import List
from app.core.supabase import supabase
from app.schemas.productos import ProductoCreate, ProductoUpdate, ProductoResponse

router = APIRouter()

@router.get("/", response_model=List[ProductoResponse])
def get_productos():
    response = supabase.table("PRODUCTOS").select("*").execute()
    return response.data

@router.get("/{codigo_producto}", response_model=ProductoResponse)
def get_producto(codigo_producto: str):
    response = supabase.table("PRODUCTOS").select("*").eq("codigo_producto", codigo_producto).execute()
    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Producto con código '{codigo_producto}' no encontrado."
        )
    return response.data[0]

@router.post("/", response_model=ProductoResponse, status_code=status.HTTP_201_CREATED)
def create_producto(producto: ProductoCreate):
    # Convertimos el esquema a diccionario excluyendo valores unset si aplica
    data = producto.model_dump()
    response = supabase.table("PRODUCTOS").insert(data).execute()
    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error al crear el producto en la base de datos."
        )
    return response.data[0]

@router.put("/{codigo_producto}", response_model=ProductoResponse)
def update_producto(codigo_producto: str, producto: ProductoUpdate):
    data = producto.model_dump(exclude_unset=True)
    if not data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No se proporcionaron campos para actualizar."
        )
    
    response = supabase.table("PRODUCTOS").update(data).eq("codigo_producto", codigo_producto).execute()
    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Producto con código '{codigo_producto}' no encontrado para actualizar."
        )
    return response.data[0]

@router.delete("/{codigo_producto}", status_code=status.HTTP_200_OK)
def delete_producto(codigo_producto: str):
    response = supabase.table("PRODUCTOS").delete().eq("codigo_producto", codigo_producto).execute()
    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Producto con código '{codigo_producto}' no encontrado para eliminar."
        )
    return {"mensaje": f"Producto '{codigo_producto}' eliminado correctamente."}