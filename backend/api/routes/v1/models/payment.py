from pydantic import BaseSettings


class Payment(BaseSettings):
    id_payment: int
    id_user: str
    id_session: str
    is_complete: bool


class CheckoutResponse(BaseSettings):
    session_id: str


class AcceptResponse(BaseSettings):
    accept: bool
