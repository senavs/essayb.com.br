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


class InvalidUrlException(BadRequestException):
    detail: str = 'Invalid user profile url'


class InvalidBase64Exception(BadRequestException):
    detail: str = 'Invalid base64'


class InvalidPostContentException(BadRequestException):
    detail: str = 'Invalid post content. Cannot set text and image to the same content. Create another one separately'


class UserFollowItselfException(BadRequestException):
    detail: str = 'User cannot follow itself'


class FollowAlreadyExistsException(BadRequestException):
    detail: str = 'Follow already exists'


class LikeAlreadyExistsException(BadRequestException):
    detail: str = 'Like already exists'


class PostAlreadyPublishedException(BadRequestException):
    detail: str = 'Post already published'


class IsPublishedAndPublishAtException(BadRequestException):
    detail: str = 'Post can not be publish and has published_at attribute at the same time'


class PastPublishDateException(BadRequestException):
    detail: str = 'You can only schedule post with future dates'
