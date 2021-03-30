from dataclasses import Field
from pyclbr import Class

from pydantic import BaseSettings


class Follow(BaseSettings):
    id_follow: int
    id_user_follower: int
    id_user_following: int

    class Config:
        extra: str = 'ignore'


class CheckFollowerResponse(BaseSettings):
    is_following: bool


class CheckFollowingResponse(BaseSettings):
    is_followed: bool


class CreateRequest(BaseSettings):
    username_follower: str
    username_following: str


class CreateResponse(Follow):
    pass
