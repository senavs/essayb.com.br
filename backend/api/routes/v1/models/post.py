from datetime import datetime

from pydantic import BaseSettings, Field, validator

from ....modules.v1.utils import from_base64


class Post(BaseSettings):
    id_post: int
    id_user: int
    title: str = Field(max_length=64)
    description: str = Field(max_length=128)
    is_published: bool
    category: dict
    created_at: datetime
    updated_at: datetime

    class Config:
        extra: str = 'ignore'


class CreateRequest(BaseSettings):
    id_category: int
    title: str = Field(max_length=64)
    description: str = Field(max_length=128)
    thumbnail: bytes

    @validator('thumbnail', pre=True)
    def to_image(cls, value: str) -> bytes:
        return from_base64(value)


class CreateResponse(Post):
    pass
