from loguru import logger
from sqlalchemy import func, text

from ...database.client import DatabaseClient
from ...database.models import Follow, User


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
