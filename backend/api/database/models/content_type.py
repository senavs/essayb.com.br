from sqlalchemy import Integer, Column, String

from .base import BaseModel
from .. import DeclarativeBase

class ContentType(DeclarativeBase, BaseModel):
    __tablename__ = 'CONTENT_TYPE'

    ID_CONTENT_TYPE = Column(Integer, autoincrement=True, nullable=False, unique=True)
    CONTENT_TYPE = Column(String(256), nullable=False, unique=False)


