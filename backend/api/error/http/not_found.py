from starlette.exceptions import HTTPException


class NotFoundException(HTTPException):
    detail: str = ''

    def __init__(self):
        super().__init__(404, self.detail)


class UserNotFoundException(NotFoundException):
    detail: str = 'User not found'


class PostNotFoundException(NotFoundException):
    detail: str = 'Post not found'


class CategoryNotFoundException(NotFoundException):
    detail: str = 'Category not found'
