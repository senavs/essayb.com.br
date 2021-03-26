from fastapi import APIRouter

from .models.follow import CheckFollowerUsernameResponse
from ...modules.v1.follow import check_follow_by_username

router = APIRouter(prefix='/follows', tags=['Follow'])


@router.get('/{username_follower}/{username_following}/check', status_code=200, response_model=CheckFollowerUsernameResponse)
def _check_follower_username(username_follower: str, username_following: str):
    return {'is_following': check_follow_by_username(username_follower, username_following)}
