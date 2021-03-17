from starlette.exceptions import HTTPException


class UnauthorizedException(HTTPException):
    detail: str = ''

    def __init__(self):
        super().__init__(401, self.detail)


class InvalidTokenException(UnauthorizedException):
    detail: str = 'Invalid authentication token'


class InvalidUsernameOrPasswordException(UnauthorizedException):
    detail: str = 'Invalid username or password'


class ExpiredTokenException(UnauthorizedException):
    detail: str = 'Expired authentication token'
