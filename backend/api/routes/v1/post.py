from fastapi import APIRouter, Depends

from ...modules.v1.authentication import AuthModel, login_required
from ...modules.v1.post import create
from .models.post import CreateRequest, CreateResponse

router = APIRouter(prefix='/posts', tags=['Post'])


@router.post('/create', summary='Create new post', status_code=200, response_model=CreateResponse)
def _create(body: CreateRequest, auth: AuthModel = Depends(login_required)):
    return create(auth.id_user, **body.dict())
