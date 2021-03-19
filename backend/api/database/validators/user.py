import re

import magic

RE_USERNAME = re.compile(r'^[^0-9\s][a-zA-Z0-9_.]{3,}')
RE_BIO = re.compile(r'\n+')
RE_URL = re.compile(r'^https?://'  # http:// or https://
                    r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|'  # domain...
                    r'localhost|'  # localhost...
                    r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ...or ip
                    r'(?::\d+)?'  # optional port
                    r'(?:/?|[/?]\S+)$', re.IGNORECASE)


def validate_username(username: str) -> bool:
    """Validate user username"""
    match = RE_USERNAME.findall(username)
    return match and match[0] == username


def validate_profile_image(image_bytes: bytes) -> bool:
    """Validate user profile image"""
    return str(magic.from_buffer(image_bytes, mime=True)).startswith('image/')


def validate_urls(url: str) -> bool:
    """Validate user profile urls"""
    match = RE_URL.findall(url)
    return match and match[0] == url


def preprocess_bio(text: str) -> str:
    """Preprocess user bio"""
    return RE_BIO.sub('\n', text)
