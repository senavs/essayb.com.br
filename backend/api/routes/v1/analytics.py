from fastapi import APIRouter, Query

from ...modules.v1.analytics import discovery, last_posts, most_followed_users, most_liked_monthly_posts, most_liked_posts
from .models.analytics import Discovery, LastPost, ListMostFollowedUsers, ListMostLikedPosts, ListMostLikedPostsMonthly

router = APIRouter(prefix='/analytics', tags=['Analytics'])


@router.get('/most_followed_users', summary='List top most followed users', status_code=200, response_model=ListMostFollowedUsers)
def _most_followed_users(top: int = Query(10, ge=0)):
    return most_followed_users(top)


@router.get('/most_liked_posts', summary='List top most liked posts', status_code=200, response_model=ListMostLikedPosts)
def _most_liked_posts(top: int = Query(10, ge=0)):
    return most_liked_posts(top)


@router.get('/most_liked_posts_monthly', summary='List post with most monthly likes of premium users', status_code=200,
            response_model=ListMostLikedPostsMonthly)
def _most_liked_monthly_posts(top: int = Query(10, ge=0)):
    return most_liked_monthly_posts(top)


@router.get('/last_posts', summary='List last published posts', status_code=200, response_model=LastPost)
def _last_posts(skip: int = Query(0, ge=0), limit: int = Query(10, ge=0)):
    return last_posts(skip=skip, limit=limit)


@router.get('/discovery', summary='List random posts', status_code=200, response_model=Discovery)
def _discovery(top: int = Query(10, ge=0)):
    return discovery(top)
