from typing import Optional

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, LargeBinary, String, func
from sqlalchemy.orm import backref, relationship
from sqlalchemy.sql import expression

from .. import DeclarativeBase
from .base import BaseModel


class Post(DeclarativeBase, BaseModel):
    __tablename__ = 'POST'

    ID_POST = Column(Integer, autoincrement=True, nullable=False, primary_key=True, unique=True)
    ID_USER = Column(Integer, ForeignKey('USER.ID_USER', ondelete='CASCADE'), nullable=False, unique=False)
    ID_CATEGORY = Column(Integer, ForeignKey('CATEGORY.ID_CATEGORY', ondelete='CASCADE'), nullable=False, unique=False)
    TITLE = Column(String(64), nullable=False, unique=False, index=True)
    DESCRIPTION = Column(String(128), nullable=False, unique=False)
    THUMBNAIL = Column(LargeBinary, nullable=False, unique=False)
    IS_PUBLISHED = Column(Boolean, nullable=False, unique=False, default=expression.false(), server_default=expression.false())
    CREATED_AT = Column(DateTime, nullable=False, unique=False, default=func.now(), server_default=func.now())
    UPDATED_AT = Column(DateTime, nullable=False, unique=False, default=func.now(), server_default=func.now(), onupdate=func.now(), server_onupdate=func.now())

    user = relationship('User', backref=backref('posts', cascade='all,delete', lazy='dynamic'))
    category = relationship('Category', backref=backref('posts', cascade='all,delete', lazy='dynamic'))

    def to_dict(self, *, exclude: Optional[list] = None, **include) -> dict:
        post = super().to_dict(exclude=exclude, **include)

        if post.get('id_category'):
            post.update(category=self.category.to_dict())
            post.pop('id_category')

        return post
