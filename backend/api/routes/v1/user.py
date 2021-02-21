from fastapi import APIRouter

from .models.user import CreateRequest, CreateResponse, SearchResponse
from ...modules.user import create, search

router = APIRouter(prefix='/users', tags=['User'])


@router.get('{id_user}/search', summary='Search user', status_code=200, response_model=SearchResponse)
def _search(id_user: int):
    return search(id_user=id_user)


@router.post('/create', summary='Create user', status_code=201, response_model=CreateResponse)
def _create(body: CreateRequest):
    return create(**body.dict())
