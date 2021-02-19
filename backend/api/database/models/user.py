from bcrypt import checkpw, gensalt, hashpw
from sqlalchemy import Boolean, Column, DateTime, Integer, String
from sqlalchemy.orm import validates
from sqlalchemy.sql import func

from .. import DeclarativeBase
from .base import BaseModel


class User(DeclarativeBase, BaseModel):
    __tablename__ = 'USER'

    ID_USER = Column(Integer, autoincrement=True, nullable=False, primary_key=True, unique=True)
    USERNAME = Column(String(32), nullable=False, unique=True)
    PASSWORD = Column(String(72), nullable=False, unique=False)
    IS_PREMIUM = Column(Boolean, nullable=False, unique=False, server_default='0')
    CREATED_AT = Column(DateTime, nullable=False, unique=False, default=func.now(), server_default=func.now())
    UPDATED_AT = Column(DateTime, nullable=False, unique=False, default=func.now(), server_default=func.now(), onupdate=func.now(), server_onupdate=func.now())

    @validates('PASSWORD')
    def encrypt(self, key, value: str) -> str:
        return self.generate_password(value)

    @classmethod
    def generate_password(cls, password: str):
        return hashpw(password.encode('utf-8'), gensalt()).decode('utf-8')

    def check_password(self, password: str) -> bool:
        return checkpw(password.encode('utf-8'), self.PASSWORD.encode('utf-8'))
