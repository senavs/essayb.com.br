from sqlalchemy import Column, Integer, String, Text, ForeignKey, LargeBinary, DateTime, func
from sqlalchemy.orm import relationship, backref

from .. import DeclarativeBase
from .base import BaseModel


class Post(DeclarativeBase, BaseModel):
    __tablename__ = 'POST'

    ID_POST = Column(Integer, autoincrement=True, nullable=False, primary_key=True, unique=True)
    ID_USER = Column(Integer, ForeignKey('USER.ID_USER', ondelete='CASCADE'), nullable=False, unique=False)
    ID_CATEGORY = Column(Integer, ForeignKey('CATEGORY.ID_CATEGORY', ondelete='CASCADE'), nullable=False, unique=False)
    TITLE = Column(String(128), nullable=False, unique=False, index=True)
    DESCRIPTION = Column(Text, nullable=False, unique=False)
    THUMBNAIL = Column(LargeBinary, nullable=True, unique=False)
    PUBLISH_DATE = Column(DateTime, nullable=True, unique=False)
    CREATED_AT = Column(DateTime, nullable=False, unique=False, default=func.now(), server_default=func.now())
    UPDATED_AT = Column(DateTime, nullable=False, unique=False, default=func.now(), server_default=func.now(), onupdate=func.now(), server_onupdate=func.now())

    user = relationship('User', backref=backref('posts', cascade='all,delete', lazy='dynamic'))
    category = relationship('Category', backref=backref('posts', cascade='all,delete', lazy='dynamic'))
