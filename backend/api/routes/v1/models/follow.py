from pydantic import BaseSettings


class CheckFollowerUsernameResponse(BaseSettings):
    is_following: bool
