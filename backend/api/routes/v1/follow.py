from fastapi import APIRouter
from fastapi.params import Depends

from ...modules.v1.authentication import AuthModel, login_required
from ...modules.v1.follow import check, count_follower, count_following, create, delete, list_follower, list_following
from .models.follow import CheckResponse, CountResponse, CreateRequest, CreateResponse, DeleteRequest, DeleteResponse, ListResponse

router = APIRouter(prefix='/follows', tags=['Follow'])


@router.get('/follower/{username}/list', summary='List all users that follows username', status_code=200, response_model=ListResponse)
def _list_follower(username: str):
    return list_follower(username)


@router.get('/following/{username}/list', summary='List all users that username is following', status_code=200, response_model=ListResponse)
def _list_following(username: str):
    return list_following(username)


@router.get('/follower/{username}/count', summary="Follower counter", status_code=200, response_model=CountResponse)
def _count_follower(username: str):
    n_follower = count_follower(username)
    return {'count': n_follower}


@router.get('/following/{username}/count', summary="Following counter", status_code=200, response_model=CountResponse)
def _count_following(username: str):
    n_following = count_following(username)
    return {'count': n_following}


@router.get('/{username_follower}/{username_following}/check', summary='Check follow', status_code=200, response_model=CheckResponse)
def _check(username_follower: str, username_following: str):
    return {'is_following': check(username_follower, username_following)}


@router.post('/create', summary='Create follow', status_code=201, response_model=CreateResponse)
def _create(body: CreateRequest, auth: AuthModel = Depends(login_required)):
    return create(auth.id_user, **body.dict())


@router.delete('/delete', summary='Delete follow', status_code=200, response_model=DeleteResponse)
def _delete(body: DeleteRequest, auth: AuthModel = Depends(login_required)):
    return {'deleted': delete(auth.id_user, **body.dict())}
