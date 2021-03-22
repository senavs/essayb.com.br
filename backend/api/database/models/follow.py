from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint
from sqlalchemy.orm import backref, relationship

from .base import BaseModel
from .. import DeclarativeBase

class Follow(DeclarativeBase, BaseModel):
    __tablename__ = 'FOLLOW'

    ID_FOLLOW = Column(Integer, autoincrement=True, nullabe=False, unique=True)
    ID_USER_FOLLOWER = Column(Integer, ForeignKey('USER.ID_USER', ondelete='CASCADE'), nullable=False, unique=True)
    ID_USER_FOLLOWING = Column(Integer, ForeignKey('USER.ID_USER', ondelete='CASCADE'), nullable=False, unique=True)

    __table_args__ = (
        UniqueConstraint('ID_USER'),
    )

    following = relationship('User', backref=backref('following', cascade='all,delete', lazy='dynamic'))
    follower = relationship('User', backref=backref('follower', cascade='all,delete', lazy='dynamic'))

