from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.inventory import Producto
from schemas.inventory import ProductoCreate, ProductoUpdate, ProductoResponse

router = APIRouter(prefix="/productos", tags=["Productos"])

@router.get("/", response_model=List[ProductoResponse])
def get_productos(db: Session = Depends(get_db)):
    return db.query(Producto).all()

@router.get("/{codigo_producto}", response_model=ProductoResponse)
def get_producto(codigo_producto: str, db: Session = Depends(get_db)):
    item = db.query(Producto).filter(Producto.codigo_producto == codigo_producto).first()
    if not item:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return item

@router.post("/", response_model=ProductoResponse, status_code=status.HTTP_201_CREATED)
def create_producto(data: ProductoCreate, db: Session = Depends(get_db)):
    item = Producto(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.put("/{codigo_producto}", response_model=ProductoResponse)
def update_producto(codigo_producto: str, data: ProductoUpdate, db: Session = Depends(get_db)):
    item = db.query(Producto).filter(Producto.codigo_producto == codigo_producto).first()
    if not item:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item

@router.delete("/{codigo_producto}", status_code=status.HTTP_204_NO_CONTENT)
def delete_producto(codigo_producto: str, db: Session = Depends(get_db)):
    item = db.query(Producto).filter(Producto.codigo_producto == codigo_producto).first()
    if not item:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    db.delete(item)
    db.commit()
    return None