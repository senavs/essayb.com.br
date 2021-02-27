from fastapi import APIRouter, Depends

from .models.user import CreateRequest, CreateResponse, SearchResponse, UpdateResponse, UpdateRequest
from ...modules.authentication import AuthModel, login_required
from ...modules.user import create, search, update

router = APIRouter(prefix='/users', tags=['User'])


@router.get('/{id_user}/search', summary='Search user', status_code=200, response_model=SearchResponse)
def _search(id_user: int):
    return search(id_user=id_user)


@router.post('/create', summary='Create user', status_code=201, response_model=CreateResponse)
def _create(body: CreateRequest):
    return create(**body.dict())


@router.put('/update', summary='Update user', status_code=200, response_model=UpdateResponse)
def _update(body: UpdateRequest, auth: AuthModel = Depends(login_required)):
    return update(auth.user['id_user'], **body.dict())
