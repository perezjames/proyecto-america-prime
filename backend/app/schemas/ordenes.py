from pydantic import BaseModel
from typing import Optional
from datetime import date

class OrdenCompraBase(BaseModel):
    proveedor: str
    fecha_orden: date
    metodo_carga: str

class OrdenCompraCreate(OrdenCompraBase):
    pass

class OrdenCompraUpdate(BaseModel):
    proveedor: Optional[str] = None
    fecha_orden: Optional[date] = None
    metodo_carga: Optional[str] = None

class OrdenCompraResponse(OrdenCompraBase):
    id_orden: int

    class Config:
        from_attributes = True