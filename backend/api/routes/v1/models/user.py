from datetime import datetime
from typing import Union

from pydantic import BaseSettings, Field, validator

from ....modules.utils import from_base64


class User(BaseSettings):
    id_user: int
    username: str = Field(max_length=32)
    bio: str = None
    url_linkedin: str = None
    url_instagram: str = None
    url_website: str = None
    is_premium: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        extra: str = 'ignore'


class SearchResponse(User):
    pass


class CreateRequest(BaseSettings):
    username: str = Field(max_length=32)
    password: str = Field(..., min_length=3)
    profile_image: bytes = None

    @validator('profile_image', pre=True)
    def to_image(cls, value: str) -> Union[bytes, None]:
        if not value:
            return None
        return from_base64(value)


class CreateResponse(User):
    pass


class UpdateRequest(BaseSettings):
    new_password: str = Field(None, min_length=3)
    profile_image: bytes = None
    bio: str = Field(None, max_length=256)
    url_linkedin: str = Field(None, max_length=128)
    url_instagram: str = Field(None, max_length=128)
    url_website: str = Field(None, max_length=128)

    @validator('profile_image', pre=True)
    def to_image(cls, value: str) -> Union[bytes, None]:
        if not value:
            return None
        return from_base64(value)


class UpdateResponse(User):
    pass
