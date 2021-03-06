from typing import Union

from fastapi import HTTPException
from loguru import logger

from ..database import User
from ..database.client import DatabaseClient
from .utils import make_query, validates_username


def search(id_user: int = None, username: str = None, *, connection: DatabaseClient = None) -> dict:
    """Search for user"""

    with DatabaseClient(connection=connection) as conn:
        logger.info(f'searching for {username} user or {id_user} id')
        if not any([id_user, username]) or not (user := conn.query(User).filter_by(**make_query(ID_USER=id_user, USERNAME=username)).first()):
            logger.error('user not found')
            raise HTTPException(404, 'user not found')

        user = user.to_dict()
    return user


def create(username: str, password: str, profile_image: Union[str, bytes] = None, *, connection: DatabaseClient = None) -> dict:
    """Create new user"""

    with DatabaseClient(connection=connection) as conn:
        if conn.query(User).filter_by(USERNAME=username).first():
            logger.error('user already registered')
            raise HTTPException(400, 'user already register')

        logger.info('validating username')
        if not (valid_username := validates_username(username)).valid:
            logger.error(f'invalid {username} username')
            raise HTTPException(400, f'invalid username. try {valid_username.suggestion}')

        logger.info(f'creating {username} user')
        user = User(USERNAME=username, PASSWORD=password, PROFILE_IMAGE=profile_image)
        user.insert(conn)

        user = user.to_dict()
    return user


def update(id_user: int, password: str = None,
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
            logger.error('user not registered')
            raise HTTPException(400, 'user not registered')

        # to change password, it's necessary to send the old one
        if new_password and password is None:
            logger.error('user password not sent')
            raise HTTPException(403, 'user password not sent')
        if password and not user.check_password(password):
            logger.error('wrong password')
            raise HTTPException(401, 'wrong password')

        logger.info(f'updating user with id {id_user}')
        user.update(conn, PASSWORD=new_password, PROFILE_IMAGE=profile_image,
                    BIO=bio, URL_LINKEDIN=url_linkedin, URL_INSTAGRAM=url_instagram, URL_WEBSITE=url_website)
        user = user.to_dict()
    return user
