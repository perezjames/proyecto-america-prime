from sqlalchemy import Column, Integer, String, Numeric, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class Usuario(Base):
    __tablename__ = "USUARIOS"

    id_usuario = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=True)
    rol = Column(String, nullable=True)

    movimientos = relationship("MovimientoInventario", back_populates="usuario")

class Producto(Base):
    __tablename__ = "PRODUCTOS"

    codigo_producto = Column(String, primary_key=True, index=True)
    descripcion = Column(String, nullable=True)
    presentacion = Column(String, nullable=True)
    peso_oz = Column(Numeric, nullable=True)
    peso_gr = Column(Numeric, nullable=True)
    stock_minimo = Column(Integer, nullable=True)

    lotes = relationship("LoteInventario", back_populates="producto")

class OrdenCompra(Base):
    __tablename__ = "ORDENES_COMPRA"

    id_orden = Column(Integer, primary_key=True, index=True)
    proveedor = Column(String, nullable=True)
    fecha_orden = Column(Date, nullable=True)
    metodo_carga = Column(String, nullable=True)

    recepciones = relationship("Recepcion", back_populates="orden")

class Recepcion(Base):
    __tablename__ = "RECEPCIONES"

    id_recepcion = Column(Integer, primary_key=True, index=True)
    id_orden = Column(Integer, ForeignKey("ORDENES_COMPRA.id_orden"), nullable=True)
    bill_of_lading = Column(String, nullable=True)
    numero_certificado_sanitario = Column(String, nullable=True)
    estado_auditoria = Column(String, nullable=True)
    origen_datos = Column(String, nullable=True)

    orden = relationship("OrdenCompra", back_populates="recepciones")
    lotes = relationship("LoteInventario", back_populates="recepcion")

class LoteInventario(Base):
    __tablename__ = "LOTES_INVENTARIO"

    id_lote_interno = Column(Integer, primary_key=True, index=True)
    codigo_producto = Column(String, ForeignKey("PRODUCTOS.codigo_producto"), nullable=True)
    id_recepcion = Column(Integer, ForeignKey("RECEPCIONES.id_recepcion"), nullable=True)
    lote_proveedor = Column(String, nullable=True)
    fecha_sacrificio = Column(Date, nullable=True)
    fecha_empaque = Column(Date, nullable=True)
    fecha_vencimiento = Column(Date, nullable=True)
    cantidad_actual = Column(Integer, nullable=True)

    producto = relationship("Producto", back_populates="lotes")
    recepcion = relationship("Recepcion", back_populates="lotes")
    movimientos = relationship("MovimientoInventario", back_populates="lote")

class MovimientoInventario(Base):
    __tablename__ = "MOVIMIENTOS_INVENTARIO"

    id_movimiento = Column(Integer, primary_key=True, index=True)
    id_lote_interno = Column(Integer, ForeignKey("LOTES_INVENTARIO.id_lote_interno"), nullable=True)
    id_usuario = Column(Integer, ForeignKey("USUARIOS.id_usuario"), nullable=True)
    tipo_movimiento = Column(String, nullable=True)
    cantidad = Column(Integer, nullable=True)
    motivo_baja = Column(String, nullable=True)
    fecha_hora = Column(DateTime, server_default=func.now())

    lote = relationship("LoteInventario", back_populates="movimientos")
    usuario = relationship("Usuario", back_populates="movimientos")