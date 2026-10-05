from pydantic import BaseModel
from typing import Optional
from datetime import date

class LoteInventarioBase(BaseModel):
    codigo_producto: str
    id_recepcion: int
    lote_proveedor: str
    fecha_sacrificio: Optional[date] = None
    fecha_empaque: Optional[date] = None
    fecha_vencimiento: Optional[date] = None
    cantidad_actual: int

class LoteInventarioCreate(LoteInventarioBase):
    pass

class LoteInventarioUpdate(BaseModel):
    codigo_producto: Optional[str] = None
    id_recepcion: Optional[int] = None
    lote_proveedor: Optional[str] = None
    fecha_sacrificio: Optional[date] = None
    fecha_empaque: Optional[date] = None
    fecha_vencimiento: Optional[date] = None
    cantidad_actual: Optional[int] = None

class LoteInventarioResponse(LoteInventarioBase):
    id_lote_interno: int

    class Config:
        from_attributes = True