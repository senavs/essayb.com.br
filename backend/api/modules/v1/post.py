from loguru import logger

from ...database import Post, User, Category
from ...database.client import DatabaseClient
from ...error.http import bad_request, not_found


def create(id_user: int, id_category: int, title: str, description: str, thumbnail: bytes, *, connection: DatabaseClient = None) -> dict:
    """Create new user post"""

    with DatabaseClient(connection=connection) as connection:
        if not (Category.search(connection, id_category)):
            raise
        post = Post(ID_USER=id_user, ID_CATEGORY=id_category, TITLE=title, DESCRIPTION=description, THUMBNAIL=thumbnail)
        post.insert(connection)

        post = post.to_dict()
    return post
