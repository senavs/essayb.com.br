from fastapi import APIRouter

from . import analytics, authentication, category, comment, follow, like, payment, post, premium, queue, user

router = APIRouter(prefix='/v1')

router.include_router(analytics.router)
router.include_router(authentication.router)
router.include_router(category.router)
router.include_router(comment.router)
router.include_router(like.router)
router.include_router(follow.router)
router.include_router(payment.router)
router.include_router(premium.router)
router.include_router(post.router)
router.include_router(queue.router)
router.include_router(user.router)
