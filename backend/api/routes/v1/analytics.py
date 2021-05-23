from fastapi import APIRouter, Query

from ...modules.v1.analytics import most_followed_users, most_liked_posts, most_liked_monthly_posts
from .models.analytics import ListMostFollowedUsers, ListMostLikedPosts, ListMostLikedPostsMonthly

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
