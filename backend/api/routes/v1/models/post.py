from datetime import datetime
from typing import Optional, Union

from pydantic import BaseSettings, Field, validator

from .category import Category
from .user import User
from ....modules.v1.utils import from_base64


class Post(BaseSettings):
    id_post: int
    title: str = Field(max_length=64)
    description: str = Field(max_length=128)
    content: str
    is_published: bool
    user: User
    category: Category
    created_at: datetime
    updated_at: datetime

    class Config:
        extra: str = 'ignore'


class SearchResponse(Post):
    pass


ListResponse = list[Post]


class CountResponse(BaseSettings):
    posts: int


class CreateRequest(BaseSettings):
    id_category: int
    title: str = Field(max_length=64)
    description: str = Field(max_length=128)
    content: str
    thumbnail: bytes

    @validator('thumbnail', pre=True)
    def to_image(cls, value: str) -> bytes:
        return from_base64(value)


class CreateResponse(Post):
    pass


class UpdateRequest(BaseSettings):
    id_post: int
    id_category: Optional[int]
    title: Optional[str] = Field(max_length=64)
    description: Optional[str] = Field(max_length=128)
    content: Optional[str]
    thumbnail: Optional[bytes]

    @validator('thumbnail', pre=True)
    def to_image(cls, value: Union[str, None]) -> Union[None, bytes]:
        if value is not None:
            return from_base64(value)


class UpdateResponse(Post):
    pass


class DeleteRequest(BaseSettings):
    id_post: int


class DeleteResponse(BaseSettings):
    deleted: bool
