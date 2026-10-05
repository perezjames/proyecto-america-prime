from fastapi import APIRouter, HTTPException, status
from typing import List
from app.core.supabase import supabase
from app.schemas.productos import ProductoCreate, ProductoUpdate, ProductoResponse

router = APIRouter()

# 1. GET - Obtener todos los productos
@router.get("/", response_model=List[ProductoResponse])
def get_productos():
    response = supabase.table("PRODUCTOS").select("*").execute()
    return response.data

# 2. GET - Obtener un producto por su código
@router.get("/{codigo_producto}", response_model=ProductoResponse)
def get_producto(codigo_producto: str):
    response = supabase.table("PRODUCTOS").select("*").eq("codigo_producto", codigo_producto).execute()
    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Producto con código '{codigo_producto}' no encontrado."
        )
    return response.data[0]

# 3. POST - Crear un nuevo producto
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

# 4. PUT - Actualizar un producto existente
@router.put("/{codigo_producto}", response_model=ProductoResponse)
def update_producto(codigo_producto: str, producto: ProductoUpdate):
    # model_dump(exclude_unset=True) envía solo los campos que el cliente realmente modificó
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

# 5. DELETE - Eliminar un producto
@router.delete("/{codigo_producto}", status_code=status.HTTP_200_OK)
def delete_producto(codigo_producto: str):
    response = supabase.table("PRODUCTOS").delete().eq("codigo_producto", codigo_producto).execute()
    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Producto con código '{codigo_producto}' no encontrado para eliminar."
        )
    return {"mensaje": f"Producto '{codigo_producto}' eliminado correctamente."}