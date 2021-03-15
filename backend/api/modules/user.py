from typing import Union

from ..database import User
from ..database.client import DatabaseClient
from ..error.http import bad_request, not_found
from .utils import make_query, remove_white_spaces, validate_username, validate_profile_image


def search(id_user: int = None, username: str = None, *, connection: DatabaseClient = None) -> dict:
    """Search for user"""

    with DatabaseClient(connection=connection) as conn:
        if not any([id_user, username]) or not (user := conn.query(User).filter_by(**make_query(ID_USER=id_user, USERNAME=username)).first()):
            raise not_found.UserNotFoundException()

        user = user.to_dict()
    return user


def profile_image(username: str, *, connection: DatabaseClient = None) -> bytes:
    """Get user profile image"""

    with DatabaseClient(connection=connection) as conn:
        user = search(username=username, connection=conn)
        image = user['profile_image']
    return image


def create(username: str, password: str, profile_image: Union[str, bytes] = None, *, connection: DatabaseClient = None) -> dict:
    """Create new user"""

    with DatabaseClient(connection=connection) as conn:
        if conn.query(User).filter_by(USERNAME=username).first():
            raise bad_request.UsernameAlreadyExistsException()

        if not validate_username(username):
            raise bad_request.InvalidUsernameException()

        if profile_image is None:
            with open('./api/static/default-profile-image.jpg', 'rb') as default_profile_image:
                profile_image = default_profile_image.read()

        user = User(USERNAME=username, PASSWORD=password, PROFILE_IMAGE=profile_image)
        user.insert(conn)
        user = user.to_dict()
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

    with DatabaseClient(connection=connection) as conn:
        if not (user := conn.query(User).filter_by(ID_USER=id_user).first()):
            raise not_found.UserNotFoundException()

        if profile_image is not None and not validate_profile_image(profile_image):
            raise bad_request.InvalidProfileImageException()

        user.update(conn, PASSWORD=new_password, PROFILE_IMAGE=profile_image,
                    BIO=remove_white_spaces(bio), URL_LINKEDIN=url_linkedin, URL_INSTAGRAM=url_instagram, URL_WEBSITE=url_website)
        user = user.to_dict()
    return user
