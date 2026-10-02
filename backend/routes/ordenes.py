from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.inventory import OrdenCompra
from schemas.inventory import OrdenCompraCreate, OrdenCompraUpdate, OrdenCompraResponse

router = APIRouter(prefix="/ordenes-compra", tags=["Ordenes Compra"])

@router.get("/", response_model=List[OrdenCompraResponse])
def get_ordenes(db: Session = Depends(get_db)):
    return db.query(OrdenCompra).all()

@router.get("/{id_orden}", response_model=OrdenCompraResponse)
def get_orden(id_orden: int, db: Session = Depends(get_db)):
    item = db.query(OrdenCompra).filter(OrdenCompra.id_orden == id_orden).first()
    if not item:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    return item

@router.post("/", response_model=OrdenCompraResponse, status_code=status.HTTP_201_CREATED)
def create_orden(data: OrdenCompraCreate, db: Session = Depends(get_db)):
    item = OrdenCompra(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.put("/{id_orden}", response_model=OrdenCompraResponse)
def update_orden(id_orden: int, data: OrdenCompraUpdate, db: Session = Depends(get_db)):
    item = db.query(OrdenCompra).filter(OrdenCompra.id_orden == id_orden).first()
    if not item:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item

@router.delete("/{id_orden}", status_code=status.HTTP_204_NO_CONTENT)
def delete_orden(id_orden: int, db: Session = Depends(get_db)):
    item = db.query(OrdenCompra).filter(OrdenCompra.id_orden == id_orden).first()
    if not item:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    db.delete(item)
    db.commit()
    return None