from sqlalchemy import Column, Integer, String

from .. import DeclarativeBase
from .base import BaseModel


class Category(DeclarativeBase, BaseModel):
    __tablename__ = 'CATEGORY'

    ID_CATEGORY = Column(Integer, autoincrement=True, nullable=False, primary_key=True, unique=True)
    CATEGORY = Column(String(32), nullable=False, unique=True, index=True)
