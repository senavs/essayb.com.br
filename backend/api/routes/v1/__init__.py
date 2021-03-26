from fastapi import APIRouter

from . import authentication, user, post, category

router = APIRouter(prefix='/v1')

router.include_router(authentication.router)
router.include_router(user.router)
router.include_router(post.router)
router.include_router(category.router)
