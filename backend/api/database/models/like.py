from typing import Optional

from sqlalchemy import Column, DateTime, ForeignKey, Integer, UniqueConstraint, func
from sqlalchemy.orm import backref, relationship

from .. import DeclarativeBase
from .base import BaseModel


class Like(DeclarativeBase, BaseModel):
    __tablename__ = 'LIKE'

    ID_LIKE = Column(Integer, autoincrement=True, nullable=False, primary_key=True, unique=True)
    ID_USER = Column(Integer, ForeignKey('USER.ID_USER', ondelete='CASCADE'), nullable=False, unique=False)
    ID_POST = Column(Integer, ForeignKey('POST.ID_POST', ondelete='CASCADE'), nullable=False, unique=False)
    CREATED_AT = Column(DateTime, nullable=False, unique=False, default=func.now(), server_default=func.now())

    __table_args__ = (
        UniqueConstraint('ID_USER', 'ID_POST'),
    )

    post = relationship('Post', backref=backref('likes', cascade='all,delete', lazy='dynamic'))
    user = relationship('User', backref=backref('likes', cascade='all,delete', lazy='dynamic'))

    def to_dict(self, *, exclude: Optional[list] = None, **include) -> dict:
        like = super().to_dict(exclude=exclude, **include)

        if like.get('id_post'):
            like.update(post=self.post.to_dict())
            like.pop('id_post')
        if like.get('id_user'):
            like.update(user=self.user.to_dict(exclude=['PROFILE_IMAGE']))
            like.pop('id_user')

        return like
