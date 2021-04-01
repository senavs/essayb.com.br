from pydantic import BaseSettings


class Follow(BaseSettings):
    id_follow: int
    id_user_follower: int
    id_user_following: int


ListResponse = list[Follow]


class CheckFollowerResponse(BaseSettings):
    is_following: bool


class CheckFollowingResponse(BaseSettings):
    is_followed: bool


class CreateRequest(BaseSettings):
    username_follower: str
    username_following: str


class CreateResponse(Follow):
    pass


class DeleteRequest(BaseSettings):
    username_follower: str
    username_following: str


class DeleteResponse(BaseSettings):
    deleted: bool


class CountResponse(BaseSettings):
    count: int
