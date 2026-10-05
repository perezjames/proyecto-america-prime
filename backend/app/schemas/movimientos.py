from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class MovimientoInventarioBase(BaseModel):
    id_lote_interno: int
    id_usuario: int
    tipo_movimiento: str
    motivo_baja: Optional[str] = None
    cantidad: int
    fecha_hora: datetime

class MovimientoInventarioCreate(MovimientoInventarioBase):
    pass

class MovimientoInventarioUpdate(BaseModel):
    id_lote_interno: Optional[int] = None
    id_usuario: Optional[int] = None
    tipo_movimiento: Optional[str] = None
    motivo_baja: Optional[str] = None
    cantidad: Optional[int] = None
    fecha_hora: Optional[datetime] = None

class MovimientoInventarioResponse(MovimientoInventarioBase):
    id_movimiento: int

    class Config:
        from_attributes = True