from sqlalchemy import Column, Integer, String, event
from sqlalchemy.engine.base import Connection
from sqlalchemy.sql.schema import Table

from .. import DeclarativeBase
from ..initial.category import rows
from .base import BaseModel


class Category(DeclarativeBase, BaseModel):
    __tablename__ = 'CATEGORY'

    ID_CATEGORY = Column(Integer, autoincrement=True, nullable=False, primary_key=True, unique=True)
    CATEGORY = Column(String(32), nullable=False, unique=True, index=True)


@event.listens_for(Category.__table__, 'after_create')
def populate(target: Table, connection: Connection, **kwargs):
    connection.execute(target.insert(), *rows)
