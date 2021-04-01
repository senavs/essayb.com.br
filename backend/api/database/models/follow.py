from sqlalchemy import Column, ForeignKey, Integer, UniqueConstraint, event
from sqlalchemy.orm import backref, relationship
from sqlalchemy.engine.base import Connection

from .. import DeclarativeBase
from .base import BaseModel
from ...error.http import bad_request


class Follow(DeclarativeBase, BaseModel):
    __tablename__ = 'FOLLOW'

    ID_FOLLOW = Column(Integer, autoincrement=True, nullable=False, primary_key=True, unique=True)
    ID_USER_FOLLOWER = Column(Integer, ForeignKey('USER.ID_USER', ondelete='CASCADE'), nullable=False, unique=True)
    ID_USER_FOLLOWING = Column(Integer, ForeignKey('USER.ID_USER', ondelete='CASCADE'), nullable=False, unique=True)

    __table_args__ = (
        UniqueConstraint('ID_USER_FOLLOWER', 'ID_USER_FOLLOWING'),
    )

    follower = relationship('User', backref=backref('follows', cascade='all,delete', lazy='dynamic'), foreign_keys=[ID_USER_FOLLOWER])
    following = relationship('User', foreign_keys=[ID_USER_FOLLOWING])


@event.listens_for(Follow, 'before_insert')
@event.listens_for(Follow, 'before_update')
def receive_after_begin(session, transaction: Connection, follow: Follow):
    if follow.ID_USER_FOLLOWER == follow.ID_USER_FOLLOWING:
        raise bad_request.UserFollowItselfException()
