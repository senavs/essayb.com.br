from io import BytesIO

from fastapi import APIRouter, Depends
from starlette.responses import StreamingResponse

from ...modules.authentication import AuthModel, login_required
from ...modules.user import create, profile_image, search_by_id, search_by_username, update
from .models.user import CreateRequest, CreateResponse, SearchResponse, UpdateRequest, UpdateResponse

router = APIRouter(prefix='/users', tags=['User'])


@router.get('/{id_user_or_username}/search', summary='Search user by ID or username', status_code=200, response_model=SearchResponse)
def _search(id_user_or_username: str):
    if id_user_or_username.isdigit():
        return search_by_id(int(id_user_or_username))
    return search_by_username(id_user_or_username)


@router.get('/{username}/profile_image', summary='Get user profile image', status_code=200, response_model=SearchResponse)
def _profile_image(username: str):
    image = BytesIO(profile_image(username))
    return StreamingResponse(image, media_type='image/png')


@router.post('/create', summary='Create user', status_code=201, response_model=CreateResponse)
def _create(body: CreateRequest):
    return create(**body.dict())


@router.put('/update', summary='Update user', status_code=200, response_model=UpdateResponse)
def _update(body: UpdateRequest, auth: AuthModel = Depends(login_required)):
    return update(auth.id_user, **body.dict())
