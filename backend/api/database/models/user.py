from typing import Optional

from bcrypt import checkpw, gensalt, hashpw
from sqlalchemy import Boolean, Column, DateTime, Integer, LargeBinary, String
from sqlalchemy.orm import validates
from sqlalchemy.sql import func

from ...error.http import bad_request
from .. import DeclarativeBase
from ..default import user as default
from ..validators import user as validators
from .base import BaseModel


class User(DeclarativeBase, BaseModel):
    __tablename__ = 'USER'

    ID_USER = Column(Integer, autoincrement=True, nullable=False, primary_key=True, unique=True)
    USERNAME = Column(String(32), nullable=False, unique=True)
    PASSWORD = Column(String(72), nullable=False, unique=False)
    BIO = Column(String(256), nullable=True, unique=False)
    URL_LINKEDIN = Column(String(128), nullable=True, unique=False)
    URL_INSTAGRAM = Column(String(128), nullable=True, unique=False)
    URL_WEBSITE = Column(String(128), nullable=True, unique=False)
    IS_PREMIUM = Column(Boolean, nullable=False, unique=False, server_default='0')
    PROFILE_IMAGE = Column(LargeBinary, nullable=False, unique=False, default=default.profile_image)
    CREATED_AT = Column(DateTime, nullable=False, unique=False, default=func.now(), server_default=func.now())
    UPDATED_AT = Column(DateTime, nullable=False, unique=False, default=func.now(), server_default=func.now(), onupdate=func.now(), server_onupdate=func.now())

    @validates('USERNAME')
    def _username(self, _, value: str) -> str:
        if not validators.validate_username(value):
            raise bad_request.InvalidUsernameException()
        return value

    @validates('PASSWORD')
    def _password(self, _, value: str) -> str:
        if not value:
            raise bad_request.InvalidPasswordException()
        return self.generate_password(value)

    @validates('PROFILE_IMAGE')
    def _profile_image(self, _, value: bytes) -> Optional[bytes]:
        if value is not None and not validators.validate_profile_image(value):
            raise bad_request.InvalidProfileImageException()
        return value

    @validates('BIO')
    def _bio(self, _, value: str) -> Optional[str]:
        if value is not None:
            return validators.preprocess_bio(value)
        return value

    @validates('URL_LINKEDIN', 'URL_INSTAGRAM', 'URL_WEBSITE')
    def _urls(self, _, value: str) -> Optional[str]:
        if value is not None and not validators.validate_urls(value):
            raise bad_request.InvalidUrlException()
        return value

    @classmethod
    def generate_password(cls, password: str):
        return hashpw(password.encode('utf-8'), gensalt()).decode('utf-8')

    def check_password(self, password: str) -> bool:
        return checkpw(password.encode('utf-8'), self.PASSWORD.encode('utf-8'))
