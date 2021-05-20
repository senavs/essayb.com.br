from fastapi import APIRouter, Depends

from ...modules.v1.authentication import AuthModel, login_required
from ...modules.v1.payment import accept, checkout
from .models.payment import AcceptResponse, CheckoutResponse

router = APIRouter(prefix='/payments', tags=['Payment'])


@router.post('/checkout', summary="Send payment request", response_model=CheckoutResponse)
def _checkout(auth: AuthModel = Depends(login_required)):
    return {'session_id': checkout(auth.id_user)}


@router.post('/accept', summary="Accept payment and turn user into premium", response_model=AcceptResponse)
def _accept(id_session: str, auth: AuthModel = Depends(login_required)):
    return {'accept': accept(auth.id_user, id_session=id_session)}
