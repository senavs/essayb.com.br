from fastapi import APIRouter, Depends

from .models.payment import CheckoutResponse
from ...modules.v1.authentication import AuthModel, login_required
from ...modules.v1.payment import checkout

router = APIRouter(prefix='/payments', tags=['Payment'])


@router.post('/checkout', response_model=CheckoutResponse)
def _check(auth: AuthModel = Depends(login_required)):
    return {'session_id': checkout(auth.id_user)}
