from pydantic import BaseSettings

from .user import User


class Follow(BaseSettings):
    id_follow: int
    follower: User
    following: User


ListResponse = list[Follow]


class CheckResponse(BaseSettings):
    is_following: bool


class CreateRequest(BaseSettings):
    username_following: str


class CreateResponse(Follow):
    pass


class DeleteRequest(BaseSettings):
    username_following: str


class DeleteResponse(BaseSettings):
    deleted: bool


class CountResponse(BaseSettings):
    count: int
