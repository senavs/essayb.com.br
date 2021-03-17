from typing import Union

from loguru import logger

from ..database import User
from ..database.client import DatabaseClient
from ..error.http import bad_request, not_found
from .utils import remove_white_spaces, validate_username, validate_profile_image


def search_by_id(id_user: int, *, connection: DatabaseClient = None) -> dict:
    """Search for user by id"""

    logger.info(f'Searching user by id number {id_user}')
    with DatabaseClient(connection=connection) as conn:
        if not (user := conn.query(User).filter_by(ID_USER=id_user).first()):
            raise not_found.UserNotFoundException()

        user = user.to_dict()

    logger.info(f'User found by id number {id_user} successfully')
    return user


def search_by_username(username: str, *, connection: DatabaseClient = None) -> dict:
    """Search for user by username"""

    logger.info(f'Searching user by username @{username}')
    with DatabaseClient(connection=connection) as conn:
        if not (user := conn.query(User).filter_by(USERNAME=username).first()):
            raise not_found.UserNotFoundException()

        user = user.to_dict()

    logger.info(f'User found by username @{username} successfully')
    return user


def profile_image(username: str, *, connection: DatabaseClient = None) -> bytes:
    """Get user profile image"""

    logger.info(f'Getting user profile image by username @{username}')
    with DatabaseClient(connection=connection) as conn:
        user = search_by_username(username, connection=conn)
        image = user['profile_image']

    logger.info(f'Profile image for username @{username} found successfully')
    return image


def create(username: str, password: str, profile_image: bytes = None, *, connection: DatabaseClient = None) -> dict:
    """Create new user"""

    logger.info(f'Creating user profile with username @{username}')
    with DatabaseClient(connection=connection) as conn:
        if conn.query(User).filter_by(USERNAME=username).first():
            raise bad_request.UsernameAlreadyExistsException()

        if not validate_username(username):
            raise bad_request.InvalidUsernameException()

        if profile_image is None:
            with open('./api/static/default-profile-image.jpg', 'rb') as default_profile_image:
                profile_image = default_profile_image.read()

        if not validate_profile_image(profile_image):
            raise bad_request.InvalidProfileImageException()

        user = User(USERNAME=username, PASSWORD=password, PROFILE_IMAGE=profile_image)
        user.insert(conn)
        user = user.to_dict()

    logger.info(f'User profile with username @{username} created successfully')
    return user


def update(id_user: int,
           new_password: str = None,
           profile_image: Union[str, bytes] = None,
           bio: str = None,
           url_linkedin: str = None,
           url_instagram: str = None,
           url_website: str = None,
           *, connection: DatabaseClient = None) -> dict:
    """Update user"""

    logger.info(f'Updating user information by id number {id_user}')
    with DatabaseClient(connection=connection) as conn:
        if not (user := conn.query(User).filter_by(ID_USER=id_user).first()):
            raise not_found.UserNotFoundException()

        if profile_image is not None and not validate_profile_image(profile_image):
            raise bad_request.InvalidProfileImageException()

        user.update(conn, PASSWORD=new_password, PROFILE_IMAGE=profile_image,
                    BIO=remove_white_spaces(bio), URL_LINKEDIN=url_linkedin, URL_INSTAGRAM=url_instagram, URL_WEBSITE=url_website)
        user = user.to_dict()

    logger.info(f'User information with id number {id_user} updated successfully')
    return user
