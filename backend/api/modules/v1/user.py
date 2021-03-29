from typing import Union

from loguru import logger

from ...database import User
from ...database.client import DatabaseClient
from ...error.http import bad_request, not_found


def search_by_id(id_user: int, *, connection: DatabaseClient = None, raise_404: bool = True, use_dict: bool = True) -> Union[dict, User, None]:
    """Search for user by id"""

    logger.info(f'Searching user by id number {id_user}')
    with DatabaseClient(connection=connection) as connection:
        if not (user := User.search(connection, id_user)) and raise_404:
            raise not_found.UserNotFoundException()

        if use_dict and user:
            user = user.to_dict()
        elif use_dict:
            user = {}

    logger.info(f'User found by id number {id_user} successfully')
    return user


def search_by_username(username: str, *, connection: DatabaseClient = None, raise_404: bool = True, use_dict: bool = True) -> Union[dict, User, None]:
    """Search for user by username"""

    logger.info(f'Searching user by username @{username}')
    with DatabaseClient(connection=connection) as connection:
        if not (user := connection.query(User).filter_by(USERNAME=username).first()) and raise_404:
            raise not_found.UserNotFoundException()

        if use_dict and user:
            user = user.to_dict()
        elif use_dict:
            user = {}

    logger.info(f'User found by username @{username} successfully')
    return user


def list_(*, connection: DatabaseClient = None) -> list[dict]:
    """List all users"""

    logger.info(f'Listing all users')
    with DatabaseClient(connection=connection) as connection:
        users = connection.query(User).all()
        users = [user.to_dict(exclude=['PROFILE_IMAGE']) for user in users]

    logger.info(f'Listed all users successfully')
    return users


def profile_image(username: str, *, connection: DatabaseClient = None) -> bytes:
    """Get user profile image"""

    logger.info(f'Getting user profile image by username @{username}')
    with DatabaseClient(connection=connection) as connection:
        user = search_by_username(username, connection=connection)
        image = user['profile_image']

    logger.info(f'Profile image for username @{username} found successfully')
    return image


def create(username: str, password: str, profile_image: bytes = None, *, connection: DatabaseClient = None) -> dict:
    """Create new user"""

    logger.info(f'Creating user profile with username @{username}')
    with DatabaseClient(connection=connection) as connection:
        if search_by_username(username, connection=connection, raise_404=False, use_dict=False):
            raise bad_request.UsernameAlreadyExistsException()

        user = User(USERNAME=username, PASSWORD=password, PROFILE_IMAGE=profile_image)
        user.insert(connection)
        user = user.to_dict()

    logger.info(f'User profile with username @{username} created successfully')
    return user


def update(id_user: int,
           new_password: str = None,
           profile_image: bytes = None,
           bio: str = None,
           url_linkedin: str = None,
           url_instagram: str = None,
           url_website: str = None,
           *, connection: DatabaseClient = None) -> dict:
    """Update user"""

    logger.info(f'Updating user information by id number {id_user}')
    with DatabaseClient(connection=connection) as connection:
        user = search_by_id(id_user, connection=connection, raise_404=True, use_dict=False)
        user.update(
            connection,
            PASSWORD=new_password,
            PROFILE_IMAGE=profile_image,
            BIO=bio,
            URL_LINKEDIN=url_linkedin,
            URL_INSTAGRAM=url_instagram,
            URL_WEBSITE=url_website
        )
        user = user.to_dict()

    logger.info(f'User information with id number {id_user} updated successfully')
    return user
