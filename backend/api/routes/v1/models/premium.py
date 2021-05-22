from pydantic import BaseSettings


class Premium(BaseSettings):
    is_premium: bool
    n_post: int
    is_allow_create_post: bool


class StatusResponse(Premium):
    pass
