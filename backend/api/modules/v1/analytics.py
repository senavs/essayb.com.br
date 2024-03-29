from datetime import datetime

from loguru import logger
from sqlalchemy import desc, extract, func, text

from ...database.client import DatabaseClient
from ...database.models import Follow, Like, Post, User


def most_followed_users(top: int, *, connection: DatabaseClient = None) -> list[dict]:
    """List top most followed users"""

    logger.info(f'List top {top} most followed users')
    with DatabaseClient(connection=connection) as conn:
        followings_sub = conn.query(Follow.ID_USER_FOLLOWING, func.count(Follow.ID_USER_FOLLOWING)) \
            .group_by(Follow.ID_USER_FOLLOWING) \
            .order_by(text('2 DESC')) \
            .subquery('followings')
        users = conn.query(followings_sub) \
            .outerjoin(User, User.ID_USER == followings_sub.c.ID_USER_FOLLOWING) \
            .limit(top) \
            .with_entities(User)

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


def most_liked_monthly_posts(top: int, *, connection: DatabaseClient = None) -> list[dict]:
    """List post with most monthly likes of premium users"""

    logger.info(f'List top {top} most monthly likes of premium users')
    with DatabaseClient(connection=connection) as conn:
        today_datetime = datetime.utcnow()

        likes_sub = conn.query(Like.ID_POST, Like.CREATED_AT, func.count(Like.ID_POST)) \
            .group_by(Like.ID_POST, Like.CREATED_AT) \
            .order_by(text('3 DESC')) \
            .subquery('likes')
        posts = conn.query(likes_sub) \
            .join(Post, Post.ID_POST == likes_sub.c.ID_POST) \
            .join(User, User.ID_USER == Post.ID_USER) \
            .filter(extract('month', likes_sub.c.CREATED_AT) == today_datetime.month,
                    extract('year', likes_sub.c.CREATED_AT) == today_datetime.year,
                    User.IS_PREMIUM.is_(True),
                    Post.IS_PUBLISHED.is_(True)) \
            .limit(top) \
            .with_entities(Post)

    result = [post.to_dict() for post in posts.all()]
    logger.info(f'Listed top {top} most monthly likes of premium users')
    return result


def last_posts(*, connection: DatabaseClient = None, skip: int = 0, limit: int = None) -> list[dict]:
    """List last published posts"""

    logger.info(f'List last published posts')
    with DatabaseClient(connection=connection) as conn:
        posts = conn.query(Post) \
            .filter(Post.IS_PUBLISHED.is_(True)) \
            .order_by(desc(Post.PUBLISH_AT)) \
            .offset(skip) \
            .limit(limit)

        result = [post.to_dict() for post in posts]

    logger.info(f'List last published posts successfully')
    return result


def discovery(top: int, *, connection: DatabaseClient = None) -> list[dict]:
    """List top most followed users"""

    logger.info(f'List top {top} most followed users')
    with DatabaseClient(connection=connection) as conn:
        posts = conn.query(Post).filter(Post.IS_PUBLISHED.is_(True)) \
            .order_by(func.random()) \
            .limit(top)

        result = [post.to_dict() for post in posts.all()]

    logger.info(f'Listed top {top} most followed users successfully')
    return result
