from fastapi import APIRouter

from . import authentication

router = APIRouter(prefix='/v1')

router.include_router(authentication.router)
