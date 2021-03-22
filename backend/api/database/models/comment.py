from sqlalchemy import Column, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import backref, relationship

from .. import DeclarativeBase
from .base import BaseModel


class Comment(DeclarativeBase, BaseModel):
    __tablename__ = 'COMMENT'

    ID_COMMENT = Column(Integer, autoincrement=True, nullable=False, primary_key=True, unique=True)
    ID_USER = Column(Integer, ForeignKey('USER.ID_USER', ondelete='CASCADE'), nullable=False, unique=False)
    ID_POST = Column(Integer, ForeignKey('POST.ID_POST', ondelete='CASCADE'), nullable=False, unique=False)
    COMMENT = Column(String(256), nullable=False, unique=False)

    __table_args__ = (
        UniqueConstraint('ID_USER', 'ID_POST'),
    )

    post = relationship('Post', backref=backref('comments', cascade='all,delete', lazy='dynamic'))
    user = relationship('User', backref=backref('comments', cascade='all,delete', lazy='dynamic'))
