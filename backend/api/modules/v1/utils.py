from base64 import b64decode, b64encode
from binascii import Error as Base64Error
from typing import Union

from sqlalchemy import and_

from ...database import DeclarativeBase
from ...error.http import bad_request


def to_base64(value: Union[bytes, str]) -> str:
    """String or bytes to base64 bytes"""

    if isinstance(value, str):
        return b64encode(value.encode('utf-8')).decode('utf-8')
    return b64encode(value).decode('utf-8')


def from_base64(value: Union[bytes, str]) -> bytes:
    """Base64 string or bytes to decoded string"""

    try:
        return b64decode(value)
    except Base64Error:
        raise bad_request.InvalidBase64Exception()


def ilike_query(query: str, model: DeclarativeBase, attr: str) -> and_:
    """Ilike query constructor"""

    return and_(getattr(model, attr).ilike(f'%{q}%') for q in query.strip().split())
