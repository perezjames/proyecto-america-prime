from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.inventory import MovimientoInventario
from schemas.inventory import MovimientoInventarioCreate, MovimientoInventarioUpdate, MovimientoInventarioResponse

router = APIRouter(prefix="/movimientos", tags=["Movimientos Inventario"])

@router.get("/", response_model=List[MovimientoInventarioResponse])
def get_movimientos(db: Session = Depends(get_db)):
    return db.query(MovimientoInventario).all()

@router.get("/{id_movimiento}", response_model=MovimientoInventarioResponse)
def get_movimiento(id_movimiento: int, db: Session = Depends(get_db)):
    item = db.query(MovimientoInventario).filter(MovimientoInventario.id_movimiento == id_movimiento).first()
    if not item:
        raise HTTPException(status_code=404, detail="Movimiento no encontrado")
    return item

@router.post("/", response_model=MovimientoInventarioResponse, status_code=status.HTTP_201_CREATED)
def create_movimiento(data: MovimientoInventarioCreate, db: Session = Depends(get_db)):
    item = MovimientoInventario(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.put("/{id_movimiento}", response_model=MovimientoInventarioResponse)
def update_movimiento(id_movimiento: int, data: MovimientoInventarioUpdate, db: Session = Depends(get_db)):
    item = db.query(MovimientoInventario).filter(MovimientoInventario.id_movimiento == id_movimiento).first()
    if not item:
        raise HTTPException(status_code=404, detail="Movimiento no encontrado")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item

@router.delete("/{id_movimiento}", status_code=status.HTTP_204_NO_CONTENT)
def delete_movimiento(id_movimiento: int, db: Session = Depends(get_db)):
    item = db.query(MovimientoInventario).filter(MovimientoInventario.id_movimiento == id_movimiento).first()
    if not item:
        raise HTTPException(status_code=404, detail="Movimiento no encontrado")
    db.delete(item)
    db.commit()
    return None