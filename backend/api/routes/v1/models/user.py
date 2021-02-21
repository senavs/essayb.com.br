from datetime import datetime

from pydantic import BaseSettings, Field


class User(BaseSettings):
    username: str = Field(max_length=32)
    is_premium: bool
    created_at: datetime
    updated_at: datetime
