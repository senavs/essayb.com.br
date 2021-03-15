from collections import namedtuple
from datetime import datetime
from typing import Union

import jwt
from fastapi import Header

from .. import config
from ..database import TokenBlacklist, User
from ..database.client import DatabaseClient
from ..error.http import unauthorized
from .user import search

AuthModel = namedtuple('AuthModel', 'token id_user')


def to_token(id_user: int) -> str:
    """User dict representation to jwt token"""

    payload = {
        'iat': datetime.utcnow(),
        'id_user': id_user
    }
    token = jwt.encode(payload, config.auth.SECRET_KEY, algorithm="HS256")

    return token


def from_token(token: str) -> int:
    """Token to user dict representation"""

    try:
        user = jwt.decode(token, config.auth.SECRET_KEY, algorithms=["HS256"])['id_user']
    except (jwt.InvalidTokenError, KeyError):
        raise unauthorized.InvalidTokenException()

    return user


def login(username: str, password: str) -> Union[AuthModel, tuple[str, dict]]:
    """Login user and get token"""

    with DatabaseClient() as conn:
        if not (user := conn.query(User).filter_by(USERNAME=username).first()):
            raise unauthorized.InvalidUsernameOrPasswordException()
        if not user.check_password(password):
            raise unauthorized.InvalidUsernameOrPasswordException()

        token = to_token(user.ID_USER)

    return AuthModel(token, user.ID_USER)


def logout(token: str):
    """Logout user and set token to blacklist"""

    with DatabaseClient() as conn:
        if conn.query(TokenBlacklist).filter_by(TOKEN=token).first():
            raise unauthorized.ExpiredTokenException()
        TokenBlacklist(TOKEN=token).insert(conn)


def login_required(authentication: str = Header(..., alias='JWT-Token')) -> Union[AuthModel, tuple[str, dict]]:
    """Function to use with fastapi.Depends in routes to verify user is logged in"""

    # validates static authorization token
    bearer_token = authentication.split(' ', maxsplit=2)
    if len(bearer_token) != 2 or bearer_token[0].lower() != 'bearer':
        raise unauthorized.InvalidTokenException()
    else:
        _, token = bearer_token

    # validates if its and expired token
    with DatabaseClient() as conn:
        if conn.query(TokenBlacklist).filter_by(TOKEN=token).first():
            raise unauthorized.ExpiredTokenException()

        # validates if is a valid token
        id_user = from_token(token)

        # verify if user exists
        search(id_user=id_user, connection=conn)
    return AuthModel(token, id_user)
