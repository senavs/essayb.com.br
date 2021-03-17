import re
from base64 import b64decode, b64encode
from binascii import Error as Base64Error
from typing import Union

import magic

from ..error.http import bad_request

RE_USERNAME = re.compile(r'^[^0-9\s][a-zA-Z0-9_.]{3,}')
RE_WHITE_SPACES = re.compile(r'\n+')


def validate_username(username: str) -> bool:
    match = RE_USERNAME.findall(username)
    return match and match[0] == username


def validate_profile_image(image_bytes: bytes) -> bool:
    return str(magic.from_buffer(image_bytes, mime=True)).startswith('image/')


def remove_white_spaces(text: str) -> str:
    return RE_WHITE_SPACES.sub('\n', text)


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
