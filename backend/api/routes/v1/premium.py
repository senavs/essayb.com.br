from fastapi import APIRouter, Depends

from ...modules.v1.authentication import AuthModel, login_required
from ...modules.v1.premium import status
from .models.premium import StatusResponse

router = APIRouter(prefix='/premium', tags=['Premium'])


@router.get('/status', summary='Get user premium status information', status_code=200, response_model=StatusResponse)
def _status(auth: AuthModel = Depends(login_required)):
    return status(id_user=auth.id_user)._asdict()
