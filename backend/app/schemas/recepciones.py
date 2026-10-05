from pydantic import BaseModel
from typing import Optional

class RecepcionBase(BaseModel):
    id_orden: int
    bill_of_lading: str
    numero_certificado_sanitario: str
    estado_auditoria: str
    origen_datos: str

class RecepcionCreate(RecepcionBase):
    pass

class RecepcionUpdate(BaseModel):
    id_orden: Optional[int] = None
    bill_of_lading: Optional[str] = None
    numero_certificado_sanitario: Optional[str] = None
    estado_auditoria: Optional[str] = None
    origen_datos: Optional[str] = None

class RecepcionResponse(RecepcionBase):
    id_recepcion: int

    class Config:
        from_attributes = True