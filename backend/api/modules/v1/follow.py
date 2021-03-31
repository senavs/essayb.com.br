from loguru import logger

from .user import search_by_username, search_by_id
from ...database import Follow, follow
from ...database.client import DatabaseClient


def check_follower_by_username(username_follower: str, username_following: str, *, connection: DatabaseClient = None) -> bool:
    """Check if some username is following other one by username"""

    logger.info(f'Checking if username {username_follower} is following {username_following}')
    with DatabaseClient(connection=connection) as connection:
        follower = search_by_username(username_follower, connection=connection, raise_404=True, use_dict=False)
        following = search_by_username(username_following, connection=connection, raise_404=True, use_dict=False)

        query = connection.query(Follow).filter_by(ID_USER_FOLLOWER=follower.ID_USER, ID_USER_FOLLOWING=following.ID_USER).first()

    logger.info(f'Checking if username {username_follower} is following {username_following} successfully')
    return bool(query)


def check_follower_by_id(id_user_follower: int, id_user_following: int, *, connection: DatabaseClient = None) -> bool:
    """Check if some username is following other one by ID"""

    logger.info(f'Checking if username with id number {id_user_follower} is following {id_user_following} id')
    with DatabaseClient(connection=connection) as connection:
        follower = search_by_id(id_user_follower, connection=connection, raise_404=True, use_dict=False)
        following = search_by_id(id_user_following, connection=connection, raise_404=True, use_dict=False)

        query = connection.query(Follow).filter_by(ID_USER_FOLLOWER=follower.ID_USER, ID_USER_FOLLOWING=following.ID_USER).first()

    logger.info(f'Checking if username with id number {id_user_follower} is following {id_user_following} id')
    return bool(query)


def check_following_by_username(username_following: str, username_follower: str, *, connection: DatabaseClient = None) -> bool:
    """Check if some username is follower other one by username"""

    logger.info(f'Checking if username {username_following} is follower {username_follower}')
    with DatabaseClient(connection=connection) as connection:
        follower = search_by_username(username_follower, connection=connection, raise_404=True, use_dict=False)
        following = search_by_username(username_following, connection=connection, raise_404=True, use_dict=False)

    query = connection.query(Follow).filter_by(ID_USER_FOLLOWING=following.ID_USER, ID_USER_FOLLOWER=follower.ID_USER.first())

    logger.info(f'Checking if username {username_following} is follower {username_follower} successfully')
    return bool(query)


def check_following_by_id(id_user_following: int, id_user_follower: int, *, connection: DatabaseClient = None) -> bool:
    """Check if some username is following other one by ID"""

    logger.info(f'Checking if username with id number {id_user_following} is follower {id_user_follower} id')
    with DatabaseClient(connection=connection) as connection:
        follower = search_by_id(id_user_follower, connection=connection, raise_404=True, use_dict=False)
        following = search_by_id(id_user_following, connection=connection, raise_404=True, use_dict=False)

        query = connection.query(Follow).filter_by(ID_FOLLOWING=following.ID_USER, ID_USER_FOLLOWER=follower.ID_USER.first())

    logger.info(f'Checking if username with id number {id_user_following} is follower {id_user_follower} id')
    return bool(query)


def create(username_follower: str, username_following: str, *, connection: DatabaseClient = None) -> dict:
    """Create new follows by username"""

    with DatabaseClient(connection=connection) as connection:
        follower = search_by_username(username_follower, connection=connection, raise_404=False, use_dict=False)
        following = search_by_username(username_following, connection=connection, raise_404=False, use_dict=False)

        id_follower = follower['id_user_follower']
        id_following = following['id_user_following']

        new_follow = Follow(ID_USER_FOLLOWER=id_follower, ID_USER_FOLLOWING=id_following)
        new_follow.insert(connection)
        new_follow = follow.to_dict()

    logger.info(f'Create follow between @{username_follower} and @{username_following}')
    return new_follow


def delete(username_follower: str, username_following: str, *, connection: DatabaseClient = None) -> dict:
    """Delete follow between users"""
    with DatabaseClient(connection=connection) as connection:
        follower = search_by_username(username_follower, connection=connection, raise_404=False, use_dict=False)
        following = search_by_username(username_following, connection=connection, raise_404=False, use_dict=False)

        id_follower = follower['id_user_follower']
        id_following = following['id_user_following']

        follow = Follow(ID_USER_FOLLOWER=id_follower, ID_USER_FOLLOWING=id_following)
        follow.delete(connection)
        follow = follow.to_dict()

    return follow


def list_follow(username: str, *, connection: DatabaseClient = None) -> list:
    with DatabaseClient(connection=connection) as connection:
        user = search_by_username(username, connection=connection, raise_404=False, use_dict=False)
    id_follow = user['id_user_follower']

    query = connection.query(Follow).filter_by(ID_USER_FOLLOWER=id_follow.ID_USER.all_())

    return list(query)


def list_following(username: str, *, connection: DatabaseClient = None) -> list:
    with DatabaseClient(connection=connection) as connection:
        follow = search_by_username(username, connection=connection, raise_404=False, use_dict=False)
        id_following = follow['id_user_following']

        query = connection.query(Follow).filter_by(ID_USER_FOLLOWING=follow.ID_USER.all_())

        return list(query)
