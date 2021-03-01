from fastapi import APIRouter, Depends

from ...modules.authentication import AuthModel, login, login_required, logout
from .models.authentication import LoginRequest, LoginResponse, LogoutResponse, ValidateResponse

router = APIRouter(prefix='/auth', tags=['Authentication'])


@router.post('/login', summary='User login', status_code=200, response_model=LoginResponse)
def _login(body: LoginRequest):
    auth = login(**body.dict())
    return {'token': auth.token, 'user': auth.user}


@router.post('/logout', summary='User logout', status_code=200, response_model=LogoutResponse)
def _logout(auth: AuthModel = Depends(login_required)):
    logout(auth.token)
    return {}


@router.post('/validate', summary='Validate user token', status_code=200, response_model=ValidateResponse)
def _validate(auth: AuthModel = Depends(login_required)):
    return {'token': auth.token, 'user': auth.user}
