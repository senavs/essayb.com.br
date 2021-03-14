from typing import Union

from fastapi import HTTPException

from ..database import User
from ..database.client import DatabaseClient
from .utils import make_query, validate_username, remove_white_spaces


def search(id_user: int = None, username: str = None, *, connection: DatabaseClient = None) -> dict:
    """Search for user"""

    with DatabaseClient(connection=connection) as conn:
        if not any([id_user, username]) or not (user := conn.query(User).filter_by(**make_query(ID_USER=id_user, USERNAME=username)).first()):
            raise HTTPException(404, 'user not found')

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
            raise HTTPException(400, 'user already register')

        if not validate_username(username):
            raise HTTPException(400, f'invalid username')

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
            raise HTTPException(400, 'user not registered')

        user.update(conn, PASSWORD=new_password, PROFILE_IMAGE=profile_image,
                    BIO=remove_white_spaces(bio), URL_LINKEDIN=url_linkedin, URL_INSTAGRAM=url_instagram, URL_WEBSITE=url_website)
        user = user.to_dict()
    return user
