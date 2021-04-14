from starlette.exceptions import HTTPException


class NotFoundException(HTTPException):
    detail: str = ''

    def __init__(self):
        super().__init__(404, self.detail)


class UserNotFoundException(NotFoundException):
    detail: str = 'User not found'


class FollowNotFoundException(NotFoundException):
    detail: str = 'Follow not found'


class PostNotFoundException(NotFoundException):
    detail: str = 'Post not found'


class PostCommentNotFoundException(NotFoundException):
    detail: str = 'Post comment not found'


class LikeNotFoundException(NotFoundException):
    detail: str = 'Like not found'


class CategoryNotFoundException(NotFoundException):
    detail: str = 'Category not found'
