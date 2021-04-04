from starlette.exceptions import HTTPException


class ForbiddenException(HTTPException):
    detail: str = ''

    def __init__(self):
        super().__init__(403, self.detail)


class UserUpdatingOthersPostException(ForbiddenException):
    detail: str = 'User can only edit it\'s own post'


class UserDeletingOthersPostException(ForbiddenException):
    detail: str = 'User can only delete it\'s own post'
