from collections import namedtuple
from datetime import datetime
from typing import Union

import jwt
from fastapi import Header
from loguru import logger

from ... import config
from ...database import TokenBlacklist, User
from ...database.client import DatabaseClient
from ...error.http import unauthorized
from .user import search_by_id

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


def login(username: str, password: str, *, connection: DatabaseClient = None) -> Union[AuthModel, tuple[str, dict]]:
    """Login user and get token"""

    logger.info(f'Logging in user @{username}')
    with DatabaseClient(connection=connection) as connection:
        if not (user := connection.query(User).filter_by(USERNAME=username).first()):
            raise unauthorized.InvalidUsernameOrPasswordException()
        if not user.check_password(password):
            raise unauthorized.InvalidUsernameOrPasswordException()

        token = to_token(user.ID_USER)

    logger.info(f'User @{username} logged in successfully')
    return AuthModel(token, user.ID_USER)


def logout(token: str, *, connection: DatabaseClient = None):
    """Logout user and set token to blacklist"""

    logger.info(f'Logging out user with token {token[:7]}')
    with DatabaseClient(connection=connection) as connection:
        if connection.query(TokenBlacklist).filter_by(TOKEN=token).first():
            raise unauthorized.ExpiredTokenException()
        TokenBlacklist(TOKEN=token).insert(connection)

    logger.info(f'User with token {token[:7]} logged out successfully')


def login_required(authentication: str = Header(..., alias='JWT-Token')) -> Union[AuthModel, tuple[str, dict]]:
    """Function to use with fastapi.Depends in routes to verify user is logged in"""

    logger.info('Validating user static authorization token')
    bearer_token = authentication.split(' ', maxsplit=2)
    if len(bearer_token) != 2 or bearer_token[0].lower() != 'bearer':
        raise unauthorized.InvalidTokenException()
    else:
        _, token = bearer_token

    logger.info(f'Validating if {token[:7]} token is an expired one')
    with DatabaseClient() as conn:
        if conn.query(TokenBlacklist).filter_by(TOKEN=token).first():
            raise unauthorized.ExpiredTokenException()

        id_user = from_token(token)

        search_by_id(id_user, connection=conn)

    logger.info(f'User token {token[:7]} validated successfully')
    return AuthModel(token, id_user)
