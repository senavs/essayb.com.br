from collections import namedtuple
from datetime import datetime
from typing import Union

import jwt
from fastapi import Header, HTTPException
from loguru import logger

from .. import config
from ..database import TokenBlacklist, User
from ..database.client import DatabaseClient
from .utils import to_base64

AuthModel = namedtuple('AuthModel', 'token user')


def to_token(user: dict) -> str:
    """User dict representation to jwt token"""

    payload = {
        'iat': datetime.utcnow(),
        'user': user
    }
    token = jwt.encode(payload, config.auth.SECRET_KEY, algorithm="HS256")

    return token


def from_token(token: str) -> dict:
    """Token to user dict representation"""

    try:
        user = jwt.decode(token, config.auth.SECRET_KEY, algorithms=["HS256"])['user']
    except (jwt.InvalidTokenError, KeyError):
        raise HTTPException(401, 'invalid token')

    return user


def login(username: str, password: str) -> Union[AuthModel, tuple[str, dict]]:
    """Login user and get token"""

    with DatabaseClient() as conn:
        logger.info('validating user')
        if not (user := conn.query(User).filter_by(USERNAME=username).first()):
            logger.error(f'user @{username} not found')
            raise HTTPException(401, 'user not found')
        if not user.check_password(password):
            logger.error(f'wrong password for @{username} user')
            raise HTTPException(401, 'wrong password')

        user = user.to_dict(exclude=['PASSWORD', 'PROFILE_IMAGE', 'CREATED_AT', 'UPDATED_AT'])
        if user.get('profile_image'):
            logger.info('profile image bytes to base64')
            user['profile_image'] = to_base64(user['profile_image'])

        logger.info('generating token')
        token = to_token(user)

    return AuthModel(token, user)


def logout(token: str):
    """Logout user and set token to blacklist"""

    with DatabaseClient() as conn:
        if conn.query(TokenBlacklist).filter_by(TOKEN=token).first():
            logger.error('token already expired')
            raise HTTPException(401, 'expired token')
        logger.info('expiring user token')
        TokenBlacklist(TOKEN=token).insert(conn)


def login_required(authentication: str = Header(..., alias='JWT-Token')) -> Union[AuthModel, tuple[str, dict]]:
    """Function to use with fastapi.Depends in routes to verify user is logged in"""

    # validates static authorization token
    bearer_token = authentication.split(' ', maxsplit=2)
    if len(bearer_token) != 2 or bearer_token[0].lower() != 'bearer':
        raise HTTPException(401, 'invalid token')
    else:
        _, token = bearer_token

    # validates if its and expired token
    with DatabaseClient() as conn:
        if conn.query(TokenBlacklist).filter_by(TOKEN=token).first():
            raise HTTPException(401, 'expired token')

    # validates if is a valid token
    user = from_token(token)
    logger.info(f'@{user["username"]} validated token')
    return AuthModel(token, user)
