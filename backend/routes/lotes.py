from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.inventory import LoteInventario
from schemas.inventory import LoteInventarioCreate, LoteInventarioUpdate, LoteInventarioResponse

router = APIRouter(prefix="/lotes", tags=["Lotes Inventario"])

@router.get("/", response_model=List[LoteInventarioResponse])
def get_lotes(db: Session = Depends(get_db)):
    return db.query(LoteInventario).all()

@router.get("/{id_lote_interno}", response_model=LoteInventarioResponse)
def get_lote(id_lote_interno: int, db: Session = Depends(get_db)):
    item = db.query(LoteInventario).filter(LoteInventario.id_lote_interno == id_lote_interno).first()
    if not item:
        raise HTTPException(status_code=404, detail="Lote no encontrado")
    return item

@router.post("/", response_model=LoteInventarioResponse, status_code=status.HTTP_201_CREATED)
def create_lote(data: LoteInventarioCreate, db: Session = Depends(get_db)):
    item = LoteInventario(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.put("/{id_lote_interno}", response_model=LoteInventarioResponse)
def update_lote(id_lote_interno: int, data: LoteInventarioUpdate, db: Session = Depends(get_db)):
    item = db.query(LoteInventario).filter(LoteInventario.id_lote_interno == id_lote_interno).first()
    if not item:
        raise HTTPException(status_code=404, detail="Lote no encontrado")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item

@router.delete("/{id_lote_interno}", status_code=status.HTTP_204_NO_CONTENT)
def delete_lote(id_lote_interno: int, db: Session = Depends(get_db)):
    item = db.query(LoteInventario).filter(LoteInventario.id_lote_interno == id_lote_interno).first()
    if not item:
        raise HTTPException(status_code=404, detail="Lote no encontrado")
    db.delete(item)
    db.commit()
    return None