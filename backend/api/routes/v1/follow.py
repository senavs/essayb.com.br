from fastapi import APIRouter

from ...modules.v1.follow import check_follower_by_id, check_follower_by_username, create, delete, list_follower, list_following
from .models.follow import CheckFollowerResponse, CheckFollowingResponse, CreateRequest, CreateResponse, DeleteRequest, DeleteResponse, ListResponse

router = APIRouter(prefix='/follows', tags=['Follow'])


@router.get('/follower/{username}/list', summary='List all users that follows username', status_code=200, response_model=ListResponse)
def _list_follower(username: str):
    return list_follower(username)


@router.get('/following/{username}/list', summary='List all users that username is following', status_code=200, response_model=ListResponse)
def _list_following(username: str):
    return list_following(username)


@router.get('/follower/{username_or_id_user_follower}/{username_or_id_user_following}/check',
            summary='Check follower by ID or username',
            status_code=200,
            response_model=CheckFollowerResponse)
def _check_follower_username(username_or_id_user_follower: str, username_or_id_user_following: str):
    if username_or_id_user_follower.isdigit() and username_or_id_user_following.isdigit():
        is_following = check_follower_by_id(int(username_or_id_user_follower), int(username_or_id_user_following))
    else:
        is_following = check_follower_by_username(username_or_id_user_follower, username_or_id_user_following)
    return {'is_following': is_following}


@router.get('/following/{username_or_id_user_following}/{username_or_id_user_follower}/check',
            summary='Check following by ID or username',
            status_code=200,
            response_model=CheckFollowingResponse)
def _check_following_username(username_or_id_user_following: str, username_or_id_user_follower: str):
    if username_or_id_user_following.isdigit() and username_or_id_user_follower.isdigit():
        is_follower = check_follower_by_id(int(username_or_id_user_following), int(username_or_id_user_follower))
    else:
        is_follower = check_follower_by_username(username_or_id_user_following, username_or_id_user_follower)
    return {'is_following': is_follower}


@router.post('/create', summary='Create follow', status_code=201, response_model=CreateResponse)
def _create(body: CreateRequest):
    return create(**body.dict())


@router.delete('/delete', summary='Delete follow', status_code=200, response_model=DeleteResponse)
def _delete(body: DeleteRequest):
    return {'deleted': delete(**body.dict())}
