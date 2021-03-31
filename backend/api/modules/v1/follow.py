from typing import Union

from loguru import logger

from . import user
from ...database import Follow
from ...database.client import DatabaseClient
from ...error.http import not_found, bad_request


def search_by_id(id_user_follower: str,
                 id_user_following: str, *,
                 connection: DatabaseClient = None,
                 raise_404: bool = True,
                 use_dict: bool = True) -> Union[dict, Follow, None]:
    """Search follow by id"""

    logger.info(f'Searching follow by ID number {id_user_follower} and {id_user_following}')
    with DatabaseClient(connection=connection) as connection:
        if not (follow := connection.query(Follow).filter_by(ID_USER_FOLLOWER=id_user_follower, ID_USER_FOLLOWING=id_user_following).first()) and raise_404:
            raise not_found.FollowNotFoundException()

        if use_dict and follow:
            follow = follow.to_dict()
        elif use_dict:
            follow = {}

    logger.info(f'Follow by ID number {id_user_follower} and {id_user_following} found successfully')
    return follow


def check_follower_by_username(username_follower: str, username_following: str, *, connection: DatabaseClient = None) -> bool:
    """Check if some username is following other one by username"""

    logger.info(f'Checking if username {username_follower} is following {username_following}')
    with DatabaseClient(connection=connection) as connection:
        follower = user.search_by_username(username_follower, connection=connection, raise_404=True, use_dict=False)
        following = user.search_by_username(username_following, connection=connection, raise_404=True, use_dict=False)

        query = connection.query(Follow).filter_by(ID_USER_FOLLOWER=follower.ID_USER, ID_USER_FOLLOWING=following.ID_USER).first()

    logger.info(f'Checking if username {username_follower} is following {username_following} successfully')
    return bool(query)


def check_follower_by_id(id_user_follower: int, id_user_following: int, *, connection: DatabaseClient = None) -> bool:
    """Check if some username is following other one by ID"""

    logger.info(f'Checking if username with id number {id_user_follower} is following {id_user_following} id')
    with DatabaseClient(connection=connection) as connection:
        follower = user.search_by_id(id_user_follower, connection=connection, raise_404=True, use_dict=False)
        following = user.search_by_id(id_user_following, connection=connection, raise_404=True, use_dict=False)

        query = connection.query(Follow).filter_by(ID_USER_FOLLOWER=follower.ID_USER, ID_USER_FOLLOWING=following.ID_USER).first()

    logger.info(f'Checking if username with id number {id_user_follower} is following {id_user_following} id')
    return bool(query)


def create(username_follower: str, username_following: str, *, connection: DatabaseClient = None) -> dict:
    """Create new follows by username"""

    logger.info(f'Create follow between @{username_follower} and @{username_following}')
    with DatabaseClient(connection=connection) as connection:
        if username_follower == username_following:
            raise bad_request.UserFollowItselfException()

        follower = user.search_by_username(username_follower, connection=connection, raise_404=True, use_dict=False)
        following = user.search_by_username(username_following, connection=connection, raise_404=True, use_dict=False)

        if connection.query(Follow).filter_by(ID_USER_FOLLOWER=follower.ID_USER, ID_USER_FOLLOWING=following.ID_USER).first():
            raise bad_request.FollowAlreadyExistsException()

        new_follow = Follow(ID_USER_FOLLOWER=follower.ID_USER, ID_USER_FOLLOWING=following.ID_USER)
        new_follow.insert(connection)
        new_follow = new_follow.to_dict()

    logger.info(f'Follow created between @{username_follower} and @{username_following} successfully')
    return new_follow


def delete(username_follower: str, username_following: str, *, connection: DatabaseClient = None) -> bool:
    """Delete follow between users"""

    logger.info(f'Delete follow between @{username_follower} and @{username_following}')
    with DatabaseClient(connection=connection) as connection:
        follower = user.search_by_username(username_follower, connection=connection, raise_404=True, use_dict=False)
        following = user.search_by_username(username_following, connection=connection, raise_404=True, use_dict=False)

        follow = search_by_id(follower.ID_USER, following.ID_USER, connection=connection, raise_404=True, use_dict=False)
        follow.delete(connection)

    logger.info(f'Deleted follow between @{username_follower} and @{username_following} successfully')
    return True


def list_follower(username: str, *, connection: DatabaseClient = None) -> list[dict]:
    """List all users that follow username"""

    logger.info(f'Listing all users that follow @{username}')
    with DatabaseClient(connection=connection) as connection:
        searched_user = user.search_by_username(username, connection=connection, raise_404=True, use_dict=False)
        followings = connection.query(Follow).filter_by(ID_USER_FOLLOWING=searched_user.ID_USER).all()

        result = [row.to_dict() for row in followings]

    logger.info(f'Listed all users that follow @{username} successfully')
    return result


def list_following(username: str, *, connection: DatabaseClient = None) -> list[dict]:
    """List all users that username is following"""

    logger.info(f'Listing all users that @{username} is followings')
    with DatabaseClient(connection=connection) as connection:
        searched_user = user.search_by_username(username, connection=connection, raise_404=True, use_dict=False)
        followings = connection.query(Follow).filter_by(ID_USER_FOLLOWER=searched_user.ID_USER).all()

        result = [row.to_dict() for row in followings]

    logger.info(f'Listed all users that @{username} is followings successfully')
    return result
