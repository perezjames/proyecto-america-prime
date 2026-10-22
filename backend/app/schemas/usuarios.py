from pydantic import BaseModel, EmailStr
from typing import Optional

class UsuarioBase(BaseModel):
    nombre: str
    rol_id: int
    email: EmailStr

class UsuarioCreate(UsuarioBase):
    password_hash: str

class UsuarioLogin(BaseModel):
    email: EmailStr
    password: str

class UsuarioUpdate(BaseModel):
    nombre: Optional[str] = None
    rol_id: Optional[int] = None

class UsuarioResponse(UsuarioBase):
    id_usuario: int

    class Config:
        from_attributes = True