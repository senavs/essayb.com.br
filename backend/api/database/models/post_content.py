from sqlalchemy import Column, ForeignKey, Integer, LargeBinary, Text
from sqlalchemy.orm import backref, relationship

from .. import DeclarativeBase
from .base import BaseModel


class PostContent(DeclarativeBase, BaseModel):
    __tablename__ = 'POST_CONTENT'

    ID_POST_CONTENT = Column(Integer, autoincrement=True, nullable=False, primary_key=True, unique=True)
    ID_POST = Column(Integer, ForeignKey('POST.ID_POST', ondelete='CASCADE'), nullable=False, unique=False)
    TEXT = Column(Text, nullable=False, unique=False)
    IMAGE = Column(LargeBinary, nullable=False, unique=False)

    post = relationship('Post', backref=backref('post_contents', cascade='all,delete', lazy='dynamic'))
