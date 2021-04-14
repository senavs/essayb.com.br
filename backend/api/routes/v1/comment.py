from fastapi import APIRouter, Depends

from ...modules.v1.authentication import AuthModel, login_required
from ...modules.v1.comment import create, delete, list_
from .models.comment import CreateRequest, CreateResponse, DeleteRequest, DeleteResponse, ListResponse

router = APIRouter(prefix='/comments', tags=['Comment'])


@router.get('/{id_post}/list', summary='List all post comments', status_code=200, response_model=ListResponse)
def _list(id_post: int):
    return list_(id_post)


@router.post('/create', summary='Create post comment', status_code=201, response_model=CreateResponse)
def _create(body: CreateRequest, auth: AuthModel = Depends(login_required)):
    return create(auth.id_user, **body.dict())


@router.delete('/delete', summary='Delete post comment', status_code=200, response_model=DeleteResponse)
def _delete(body: DeleteRequest, auth: AuthModel = Depends(login_required)):
    return {'deleted': delete(auth.id_user, **body.dict())}
