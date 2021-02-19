from datetime import datetime, timedelta

import jwt
from fastapi import HTTPException

from .. import config


def to_token(user: dict) -> str:
    """User dict representation to jwt token"""

    payload = {
        'iat': datetime.utcnow(),
        'exp': datetime.utcnow() + timedelta(minutes=config.auth.EXPIRED_MINUTES),
        'user': user
    }
    token = jwt.encode(payload, config.auth.SECRET_KEY, algorithm="HS256")

    return token


def from_token(token: str) -> dict:
    """Token to user dict representation"""

    try:
        user = jwt.decode(token, config.auth.SECRET_KEY, algorithms=["HS256"])['user']
    except jwt.ExpiredSignatureError:
        raise HTTPException(403, 'expired token')
    except (jwt.InvalidTokenError, KeyError):
        raise HTTPException(401, 'invalid token')

    return user
