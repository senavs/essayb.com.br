from typing import Union

from fastapi import HTTPException

from .utils import make_query
from ..database import User
from ..database.client import DatabaseClient


def search(id_user: int = None, username: str = None, *, connection: DatabaseClient = None) -> dict:
    """Search for user"""

    with DatabaseClient(connection=connection) as conn:
        if not any([id_user, username]) or not (user := conn.query(User).filter_by(**make_query(ID_USER=id_user, USERNAME=username)).first()):
            raise HTTPException(404, 'user not found')

        user = user.to_dict()
    return user


def create(username: str, password: str, profile_image: Union[str, bytes] = None, *, connection: DatabaseClient = None) -> dict:
    """Create new user"""

    with DatabaseClient(connection=connection) as conn:
        if conn.query(User).filter_by(USERNAME=username).first():
            raise HTTPException(400, 'user already register')

        user = User(USERNAME=username, PASSWORD=password, PROFILE_IMAGE=profile_image)
        user.insert(conn)

        user = user.to_dict()
    return user


def update(id_user: int, password: str = None, new_password: str = None, profile_image: Union[str, bytes] = None, *, connection: DatabaseClient = None) -> dict:
    """Update user"""

    with DatabaseClient(connection=connection) as conn:
        if not (user := conn.query(User).filter_by(ID_USER=id_user).first()):
            raise HTTPException(400, 'user not register')

        # to change password, it's necessary to send the old one
        if new_password and password is None:
            raise HTTPException(403, 'user password not sent')
        if password and not user.check_password(password):
            raise HTTPException(401, 'wrong password')

        user.update(conn, PASSWORD=new_password, PROFILE_IMAGE=profile_image)
        user = user.to_dict()
    return user
