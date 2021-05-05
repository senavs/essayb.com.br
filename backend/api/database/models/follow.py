from typing import Optional

from sqlalchemy import Column, ForeignKey, Integer, UniqueConstraint, event
from sqlalchemy.engine.base import Connection
from sqlalchemy.orm import backref, relationship

from ...error.http import bad_request
from .. import DeclarativeBase
from .base import BaseModel


class Follow(DeclarativeBase, BaseModel):
    __tablename__ = 'FOLLOW'

    ID_FOLLOW = Column(Integer, autoincrement=True, nullable=False, primary_key=True, unique=True)
    ID_USER_FOLLOWER = Column(Integer, ForeignKey('USER.ID_USER', ondelete='CASCADE'), nullable=False)
    ID_USER_FOLLOWING = Column(Integer, ForeignKey('USER.ID_USER', ondelete='CASCADE'), nullable=False)

    __table_args__ = (
        UniqueConstraint('ID_USER_FOLLOWER', 'ID_USER_FOLLOWING'),
    )

    follower = relationship('User', backref=backref('followers', cascade='all,delete', lazy='dynamic'), foreign_keys=[ID_USER_FOLLOWER])
    following = relationship('User', foreign_keys=[ID_USER_FOLLOWING])

    def to_dict(self, *, exclude: Optional[list] = None, **include) -> dict:
        follow = super().to_dict(exclude=exclude, **include)

        exclude = [] if not exclude else exclude

        if follow.get('id_user_follower'):
            follow.update(follower=self.follower.to_dict(exclude=['PROFILE_IMAGE'] + exclude))
            follow.pop('id_user_follower')
        if follow.get('id_user_following'):
            follow.update(following=self.following.to_dict(exclude=['PROFILE_IMAGE'] + exclude))
            follow.pop('id_user_following')

        return follow


@event.listens_for(Follow, 'before_insert')
@event.listens_for(Follow, 'before_update')
def receive_after_begin(session, transaction: Connection, follow: Follow):
    if follow.ID_USER_FOLLOWER == follow.ID_USER_FOLLOWING:
        raise bad_request.UserFollowItselfException()