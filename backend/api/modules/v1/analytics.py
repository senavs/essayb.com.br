from loguru import logger
from sqlalchemy import func, text

from ...database.client import DatabaseClient
from ...database.models import Follow, User, Post, Like


def most_followed_users(top: int, *, connection: DatabaseClient = None) -> list[dict]:
    """List top most followed users"""

    logger.info(f'List top {top} most followed users')
    with DatabaseClient(connection=connection) as conn:
        followings_sub = conn.query(Follow.ID_USER_FOLLOWING, func.count(Follow.ID_USER_FOLLOWING).label('total')) \
            .group_by(Follow.ID_USER_FOLLOWING) \
            .order_by(text('total DESC')) \
            .subquery('followings')
        users = conn.query(User) \
            .join(followings_sub, User.ID_USER == followings_sub.c.ID_USER_FOLLOWING) \
            .limit(top)

        result = [user.to_dict(exclude=['PROFILE_IMAGE', 'PASSWORD']) for user in users.all()]

    logger.info(f'Listed top {top} most followed users successfully')
    return result


def most_liked_posts(top: int, *, connection: DatabaseClient = None) -> list[dict]:
    """List top most followed users"""

    logger.info(f'List top {top} most liked posts')
    with DatabaseClient(connection=connection) as conn:
        likes_sub = conn.query(Like.ID_POST, func.count(Like.ID_POST).label('total')) \
            .group_by(Like.ID_POST) \
            .order_by(text('total DESC')) \
            .subquery('likes')
        posts = conn.query(Post) \
            .join(likes_sub, Post.ID_POST == likes_sub.c.ID_POST) \
            .limit(top)

        result = [post.to_dict(exclude=['THUMBNAIL']) for post in posts.all()]

    logger.info(f'Listed top {top} most liked posts successfully')
    return result