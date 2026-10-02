from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.inventory import Recepcion
from schemas.inventory import RecepcionCreate, RecepcionUpdate, RecepcionResponse

router = APIRouter(prefix="/recepciones", tags=["Recepciones"])

@router.get("/", response_model=List[RecepcionResponse])
def get_recepciones(db: Session = Depends(get_db)):
    return db.query(Recepcion).all()

@router.get("/{id_recepcion}", response_model=RecepcionResponse)
def get_recepcion(id_recepcion: int, db: Session = Depends(get_db)):
    item = db.query(Recepcion).filter(Recepcion.id_recepcion == id_recepcion).first()
    if not item:
        raise HTTPException(status_code=404, detail="Recepción no encontrada")
    return item

@router.post("/", response_model=RecepcionResponse, status_code=status.HTTP_201_CREATED)
def create_recepcion(data: RecepcionCreate, db: Session = Depends(get_db)):
    item = Recepcion(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.put("/{id_recepcion}", response_model=RecepcionResponse)
def update_recepcion(id_recepcion: int, data: RecepcionUpdate, db: Session = Depends(get_db)):
    item = db.query(Recepcion).filter(Recepcion.id_recepcion == id_recepcion).first()
    if not item:
        raise HTTPException(status_code=404, detail="Recepción no encontrada")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item

@router.delete("/{id_recepcion}", status_code=status.HTTP_204_NO_CONTENT)
def delete_recepcion(id_recepcion: int, db: Session = Depends(get_db)):
    item = db.query(Recepcion).filter(Recepcion.id_recepcion == id_recepcion).first()
    if not item:
        raise HTTPException(status_code=404, detail="Recepción no encontrada")
    db.delete(item)
    db.commit()
    return None