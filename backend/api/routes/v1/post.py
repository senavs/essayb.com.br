from fastapi import APIRouter, Depends

from ...modules.v1.authentication import AuthModel, login_required
from ...modules.v1.post import create, count_by_id, count_by_username
from .models.post import CreateRequest, CreateResponse, CountResponse

router = APIRouter(prefix='/posts', tags=['Post'])


@router.get('/{id_user_or_username}/count', summary='Count published posts', status_code=200, response_model=CountResponse)
def _count(id_user_or_username: str):
    if id_user_or_username.isdigit():
        n_posts = count_by_id(int(id_user_or_username))
    else:
        n_posts = count_by_username(id_user_or_username)
    return {'count': n_posts}


@router.post('/create', summary='Create new post', status_code=200, response_model=CreateResponse)
def _create(body: CreateRequest, auth: AuthModel = Depends(login_required)):
    return create(auth.id_user, **body.dict())
