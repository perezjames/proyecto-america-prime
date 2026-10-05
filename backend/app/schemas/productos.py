from pydantic import BaseModel
from typing import Optional

class ProductoBase(BaseModel):
    codigo_producto: str
    descripcion: Optional[str] = None
    presentacion: Optional[str] = None
    peso_oz: Optional[float] = None
    peso_gr: Optional[float] = None
    stock_minimo: Optional[int] = None

class ProductoCreate(ProductoBase):
    pass

class ProductoUpdate(BaseModel):
    descripcion: Optional[str] = None
    presentacion: Optional[str] = None
    peso_oz: Optional[float] = None
    peso_gr: Optional[float] = None
    stock_minimo: Optional[int] = None

class ProductoResponse(ProductoBase):
    class Config:
        from_attributes = True