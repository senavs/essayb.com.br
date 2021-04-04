from io import BytesIO

from fastapi import APIRouter, Depends, Query
from starlette.responses import StreamingResponse

from ...modules.v1.authentication import AuthModel, login_required
from ...modules.v1.post import count_by_id, count_by_username, create, delete, list_, search, thumbnail, update
from .models.post import (CountResponse, CreateRequest, CreateResponse, DeleteRequest, DeleteResponse, ListResponse, SearchResponse, UpdateRequest,
                          UpdateResponse)

router = APIRouter(prefix='/posts', tags=['Post'])


@router.get('/{id_post}/search', summary='Search post by ID', status_code=200, response_model=SearchResponse)
def _search(id_post: int):
    return search(id_post)


@router.get('/{username}/list', summary='List all user posts', status_code=200, response_model=ListResponse)
def _list(username: str, skip: int = Query(0, ge=0), limit: int = Query(10, ge=0)):
    return list_(username, skip=skip, limit=limit)


@router.get('/{id_user_or_username}/count', summary='Count published posts', status_code=200, response_model=CountResponse)
def _count(id_user_or_username: str):
    if id_user_or_username.isdigit():
        n_posts = count_by_id(int(id_user_or_username))
    else:
        n_posts = count_by_username(id_user_or_username)
    return {'posts': n_posts}


@router.get('/{id_post}/thumbnail', summary='Get post thumbnail', status_code=200)
def _thumbnail(id_post: int):
    image = BytesIO(thumbnail(id_post))
    return StreamingResponse(image, media_type='image/png')


@router.post('/create', summary='Create new post', status_code=201, response_model=CreateResponse)
def _create(body: CreateRequest, auth: AuthModel = Depends(login_required)):
    return create(auth.id_user, **body.dict())


@router.put('/update', summary='Update user post', status_code=200, response_model=UpdateResponse)
def _update(body: UpdateRequest, auth: AuthModel = Depends(login_required)):
    return update(auth.id_user, **body.dict())


@router.delete('/delete', summary='Delete user post', status_code=200, response_model=DeleteResponse)
def _delete(body: DeleteRequest, auth: AuthModel = Depends(login_required)):
    return {'deleted': delete(auth.id_user, **body.dict())}
