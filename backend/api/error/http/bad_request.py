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


class InvalidPostSearchQueryException(BadRequestException):
    detail: str = 'Invalid Post search query. Cannot be empty'


class InvalidUserSearchQueryException(BadRequestException):
    detail: str = 'Invalid User search query. Cannot be empty'
