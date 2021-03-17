from starlette.exceptions import HTTPException


class NotFoundException(HTTPException):
    detail: str = ''

    def __init__(self):
        super().__init__(404, self.detail)


class UserNotFoundException(NotFoundException):
    detail: str = 'User not found'
