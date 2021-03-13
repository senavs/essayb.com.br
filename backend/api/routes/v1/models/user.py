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
    password: str
    profile_image: bytes = None

    @validator('profile_image', pre=True)
    def to_image(cls, value: str) -> Union[bytes, None]:
        if not value:
            return None
        return from_base64(value)


class CreateResponse(User):
    pass


class UpdateRequest(BaseSettings):
    password: str = None
    new_password: str = None
    profile_image: bytes = None
    bio: str = None
    url_linkedin: str = None
    url_instagram: str = None
    url_website: str = None

    @validator('profile_image', pre=True)
    def to_image(cls, value: str) -> Union[bytes, None]:
        if not value:
            return None
        return from_base64(value)


class UpdateResponse(User):
    pass
