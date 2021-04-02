from fastapi import APIRouter, Depends

from ...modules.v1.authentication import login_required, AuthModel
from ...modules.v1.like import create, delete, count_by_id_post, count_by_username
from .models.like import CreateResponse, CreateRequest, DeleteResponse, DeleteRequest, CountResponse

router = APIRouter(prefix='/likes', tags=['Like'])


@router.post('/create', summary='Create like', status_code=201, response_model=CreateResponse)
def _create(body: CreateRequest, auth: AuthModel = Depends(login_required)):
    return create(auth.id_user, **body.dict())


@router.delete('/delete', summary='Delete like', status_code=200, response_model=DeleteResponse)
def _delete(body: DeleteRequest, auth: AuthModel = Depends(login_required)):
    return {'deleted': delete(auth.id_user, **body.dict())}


@router.get('/post/{id_post}/count', summary='Count post likes', status_code=200, response_model=CountResponse)
def _count_by_post(id_post: int):
    return {'likes': count_by_id_post(id_post)}


@router.get('/user/{username}/count', summary='Count user total likes', status_code=200, response_model=CountResponse)
def _count_by_user(username: str):
    return {'likes': count_by_username(username)}
