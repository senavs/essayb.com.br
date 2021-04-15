from pydantic import BaseSettings, Field

from .user import User


class Comment(BaseSettings):
    id_comment: int
    id_post: int
    user: User
    comment: str = Field(max_length=256)


ListResponse = list[Comment]


class CreateRequest(BaseSettings):
    id_post: int
    comment: str


class CreateResponse(Comment):
    pass


class DeleteRequest(BaseSettings):
    id_comment: int


class DeleteResponse(BaseSettings):
    deleted: bool
