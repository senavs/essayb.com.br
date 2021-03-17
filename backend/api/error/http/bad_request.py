from starlette.exceptions import HTTPException


class BadRequestException(HTTPException):
    detail: str = ''

    def __init__(self):
        super().__init__(400, self.detail)


class UsernameAlreadyExistsException(BadRequestException):
    detail: str = 'Username already exists'


class InvalidUsernameException(BadRequestException):
    detail: str = 'Invalid username'


class InvalidPasswordException(BadRequestException):
    detail: str = 'Invalid password'


class InvalidProfileImageException(BadRequestException):
    detail: str = 'Invalid user profile image'


class InvalidBase64Exception(BadRequestException):
    detail: str = 'Invalid base64'
