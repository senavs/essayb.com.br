from pydantic import BaseSettings, Field

from .user import User


class LoginRequest(BaseSettings):
    username: str = Field(max_length=32)
    password: str


class LoginResponse(BaseSettings):
    token: str
    user: User


class LogoutResponse(BaseSettings):
    message: str = 'user logout successfully'


class ValidateResponse(LoginResponse):
    pass
