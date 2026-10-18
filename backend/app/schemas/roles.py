from pydantic import BaseModel
from typing import Optional


class RolBase(BaseModel):
    rol: str


class RolCreate(RolBase):
    pass


class RolUpdate(BaseModel):
    rol: Optional[str] = None


class RolResponse(RolBase):
    id: int
