from pydantic import BaseModel, EmailStr
from typing import Optional

class UsuarioBase(BaseModel):
    nombre: str
    rol: str
    email: EmailStr

class UsuarioCreate(UsuarioBase):
    password: str

class UsuarioLogin(BaseModel):
    email: EmailStr
    password: str

class UsuarioUpdate(BaseModel):
    nombre: Optional[str] = None
    rol: Optional[str] = None

class UsuarioResponse(UsuarioBase):
    id_usuario: int

    class Config:
        from_attributes = True