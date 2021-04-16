from datetime import datetime
from typing import Optional, Union

from fastapi import HTTPException
from pydantic import BaseSettings, Field, validator

from ....modules.v1.utils import from_base64


class User(BaseSettings):
    id_user: int
    username: str = Field(max_length=32)
    bio: Optional[str] = Field(max_length=256)
    url_linkedin: Optional[str] = Field(max_length=128)
    url_instagram: Optional[str] = Field(max_length=128)
    url_website: Optional[str] = Field(max_length=128)
    is_premium: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        extra: str = 'ignore'


class SearchResponse(User):
    pass


ListResponse = list[User]


class CreateRequest(BaseSettings):
    username: str = Field(max_length=32)
    password: str = Field(min_length=3)


class CreateResponse(User):
    pass


class UpdateRequest(BaseSettings):
    new_password: Optional[str] = None
    profile_image: Optional[bytes] = None
    bio: Optional[str] = Field(None, max_length=256)
    url_linkedin: Optional[str] = Field(None, max_length=128)
    url_instagram: Optional[str] = Field(None, max_length=128)
    url_website: Optional[str] = Field(None, max_length=128)

    @validator('profile_image', pre=True)
    def to_image(cls, value: str) -> Union[bytes, None]:
        if not value:
            return None
        return from_base64(value)

    @validator('new_password', pre=True)
    def min_length(cls, value: Union[None, str]) -> str:
        if value and len(value) < 3:
            raise HTTPException(400, 'Password must be at lest 3 characters')
        return value


class UpdateResponse(User):
    pass
