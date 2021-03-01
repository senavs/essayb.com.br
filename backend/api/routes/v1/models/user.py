from datetime import datetime
from typing import Union

from pydantic import BaseSettings, Field, validator

from ....modules.utils import to_base64, from_base64


class User(BaseSettings):
    id_user: int
    username: str = Field(max_length=32)
    is_premium: bool
    profile_image: str = None
    created_at: datetime
    updated_at: datetime

    class Config:
        extra: str = 'ignore'

    @validator('profile_image', pre=True)
    def from_image(cls, value: bytes) -> Union[str, None]:
        if not value:
            return None
        return to_base64(value)


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

    @validator('profile_image', pre=True)
    def to_image(cls, value: str) -> Union[bytes, None]:
        if not value:
            return None
        return from_base64(value)


class UpdateResponse(User):
    pass
