from pydantic import BaseSettings, Field


class CustomUser(BaseSettings):
    id_user: int
    username: str = Field(max_length=32)
    profile_image: str = None
    is_premium: bool


class LoginRequest(BaseSettings):
    username: str = Field(max_length=32)
    password: str


class LoginResponse(BaseSettings):
    token: str
    user: CustomUser


class LogoutResponse(BaseSettings):
    message: str = 'user logout successfully'


class ValidateResponse(LoginResponse):
    pass
