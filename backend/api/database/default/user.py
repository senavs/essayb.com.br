from sqlalchemy.dialects.postgresql.psycopg2 import PGExecutionContext_psycopg2

from ...config import path


def profile_image(_: PGExecutionContext_psycopg2) -> bytes:
    """Default user profile image"""
    with open(path.join('static', 'default-profile-image.jpg'), 'rb') as default_profile_image:
        image_bytes = default_profile_image.read()
    return image_bytes
