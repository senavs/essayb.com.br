from typing import Optional

from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import backref, relationship

from .. import DeclarativeBase
from .base import BaseModel


class Payment(DeclarativeBase, BaseModel):
    __tablename__ = 'PAYMENT'

    ID_PAYMENT = Column(Integer, autoincrement=True, nullable=False, primary_key=True, unique=True)
    ID_USER = Column(Integer, ForeignKey('USER.ID_USER', ondelete='CASCADE'), nullable=False, unique=True)
    ID_SESSION = Column(String(128), nullable=False, unique=False)
    IS_COMPLETE = Column(Boolean, nullable=False, unique=False, server_default="0")

    user = relationship('User', backref=backref('payment', cascade='all,delete', uselist=False))

    def to_dict(self, *, exclude: Optional[list] = None, **include) -> dict:
        like = super().to_dict(exclude=exclude, **include)

        if like.get('id_user'):
            like.update(user=self.user.to_dict(exclude=['PROFILE_IMAGE']))
            like.pop('id_user')

        return like
