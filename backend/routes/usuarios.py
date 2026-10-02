from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.inventory import Usuario
from schemas.inventory import UsuarioCreate, UsuarioUpdate, UsuarioResponse

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

@router.get("/", response_model=List[UsuarioResponse])
def get_usuarios(db: Session = Depends(get_db)):
    return db.query(Usuario).all()

@router.get("/{id_usuario}", response_model=UsuarioResponse)
def get_usuario(id_usuario: int, db: Session = Depends(get_db)):
    item = db.query(Usuario).filter(Usuario.id_usuario == id_usuario).first()
    if not item:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return item

@router.post("/", response_model=UsuarioResponse, status_code=status.HTTP_201_CREATED)
def create_usuario(data: UsuarioCreate, db: Session = Depends(get_db)):
    item = Usuario(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.put("/{id_usuario}", response_model=UsuarioResponse)
def update_usuario(id_usuario: int, data: UsuarioUpdate, db: Session = Depends(get_db)):
    item = db.query(Usuario).filter(Usuario.id_usuario == id_usuario).first()
    if not item:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item

@router.delete("/{id_usuario}", status_code=status.HTTP_204_NO_CONTENT)
def delete_usuario(id_usuario: int, db: Session = Depends(get_db)):
    item = db.query(Usuario).filter(Usuario.id_usuario == id_usuario).first()
    if not item:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    db.delete(item)
    db.commit()
    return None