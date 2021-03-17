from pydantic import BaseSettings, Field


class LoginRequest(BaseSettings):
    username: str = Field(max_length=32)
    password: str


class LoginResponse(BaseSettings):
    token: str
    id_user: int


class LogoutResponse(BaseSettings):
    message: str = 'user logout successfully'


class ValidateResponse(LoginResponse):
    pass
