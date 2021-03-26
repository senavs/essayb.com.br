from pydantic import BaseSettings


class CheckFollowerResponse(BaseSettings):
    is_following: bool


class CheckFollowingResponse(BaseSettings):
    is_followed: bool
