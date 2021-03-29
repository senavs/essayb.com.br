from loguru import logger

from .user import search_by_username, search_by_id
from ...database import Follow
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

        query = connection.query(Follow).filter_by(ID_FOLLOWING = following.ID_USER, ID_USER_FOLLOWER=follower.ID_USER.first())

    logger.info(f'Checking if username with id number {id_user_following} is follower {id_user_follower} id')
    return bool(query)