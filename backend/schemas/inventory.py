from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

# USUARIOS
class UsuarioBase(BaseModel):
    nombre: Optional[str] = None
    rol: Optional[str] = None

class UsuarioCreate(UsuarioBase):
    id_usuario: int

class UsuarioUpdate(UsuarioBase):
    pass

class UsuarioResponse(UsuarioBase):
    id_usuario: int
    class Config:
        from_attributes = True

# PRODUCTOS
class ProductoBase(BaseModel):
    descripcion: Optional[str] = None
    presentacion: Optional[str] = None
    peso_oz: Optional[float] = None
    peso_gr: Optional[float] = None
    stock_minimo: Optional[int] = None

class ProductoCreate(ProductoBase):
    codigo_producto: str

class ProductoUpdate(ProductoBase):
    pass

class ProductoResponse(ProductoBase):
    codigo_producto: str
    class Config:
        from_attributes = True

# ORDENES COMPRA
class OrdenCompraBase(BaseModel):
    proveedor: Optional[str] = None
    fecha_orden: Optional[date] = None
    metodo_carga: Optional[str] = None

class OrdenCompraCreate(OrdenCompraBase):
    id_orden: int

class OrdenCompraUpdate(OrdenCompraBase):
    pass

class OrdenCompraResponse(OrdenCompraBase):
    id_orden: int
    class Config:
        from_attributes = True

# RECEPCIONES
class RecepcionBase(BaseModel):
    id_orden: Optional[int] = None
    bill_of_lading: Optional[str] = None
    numero_certificado_sanitario: Optional[str] = None
    estado_auditoria: Optional[str] = None
    origen_datos: Optional[str] = None

class RecepcionCreate(RecepcionBase):
    id_recepcion: int

class RecepcionUpdate(RecepcionBase):
    pass

class RecepcionResponse(RecepcionBase):
    id_recepcion: int
    class Config:
        from_attributes = True

# LOTES INVENTARIO
class LoteInventarioBase(BaseModel):
    codigo_producto: Optional[str] = None
    id_recepcion: Optional[int] = None
    lote_proveedor: Optional[str] = None
    fecha_sacrificio: Optional[date] = None
    fecha_empaque: Optional[date] = None
    fecha_vencimiento: Optional[date] = None
    cantidad_actual: Optional[int] = None

class LoteInventarioCreate(LoteInventarioBase):
    id_lote_interno: int

class LoteInventarioUpdate(LoteInventarioBase):
    pass

class LoteInventarioResponse(LoteInventarioBase):
    id_lote_interno: int
    class Config:
        from_attributes = True

# MOVIMIENTOS INVENTARIO
class MovimientoInventarioBase(BaseModel):
    id_lote_interno: Optional[int] = None
    id_usuario: Optional[int] = None
    tipo_movimiento: Optional[str] = None
    cantidad: Optional[int] = None
    motivo_baja: Optional[str] = None

class MovimientoInventarioCreate(MovimientoInventarioBase):
    id_movimiento: int

class MovimientoInventarioUpdate(MovimientoInventarioBase):
    pass

class MovimientoInventarioResponse(MovimientoInventarioBase):
    id_movimiento: int
    fecha_hora: Optional[datetime] = None
    class Config:
        from_attributes = True