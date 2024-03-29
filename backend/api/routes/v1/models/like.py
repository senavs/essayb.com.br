from datetime import datetime

from pydantic import BaseSettings

from .post import Post
from .user import User


class Like(BaseSettings):
    id_like: int
    post: Post
    user: User
    created_at: datetime


class CreateRequest(BaseSettings):
    id_post: int


class CreateResponse(Like):
    pass


class DeleteRequest(BaseSettings):
    id_post: int


class DeleteResponse(BaseSettings):
    deleted: bool


class CountResponse(BaseSettings):
    likes: int


class CheckResponse(BaseSettings):
    has_liked: bool
