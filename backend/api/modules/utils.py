from binascii import Error as Base64Error
from base64 import b64encode, b64decode
from typing import Union

from fastapi import HTTPException


def make_query(*, ignore_none: bool = True, **kwargs):
    """Create filter_by query that exclude None args"""

    return {key.upper(): value for key, value in kwargs.items() if (value is None and not ignore_none) or value is not None}


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
        raise HTTPException(400, 'invalid base64')
