from loguru import logger

from ...database import Post, Category
from ...database.client import DatabaseClient
from ...modules.v1.user import search_by_id, search_by_username
from ...error.http import bad_request, not_found


def create(id_user: int, id_category: int, title: str, description: str, thumbnail: bytes, *, connection: DatabaseClient = None) -> dict:
    """Create new user post"""

    logger.info(f'Creating new user post with title {title!r}')
    with DatabaseClient(connection=connection) as connection:
        if not (Category.search(connection, id_category)):
            raise
        post = Post(ID_USER=id_user, ID_CATEGORY=id_category, TITLE=title, DESCRIPTION=description, THUMBNAIL=thumbnail)
        post.insert(connection)

        post = post.to_dict()

    logger.info(f'User post with title {title!r} was create successfully')
    return post


def count_by_id(id_user: int, *, connection: DatabaseClient = None) -> int:
    """Count user published posts by ID"""

    logger.info(f'Counting published posts of user with id number {id_user}')
    with DatabaseClient(connection=connection) as connection:
        user = search_by_id(id_user, connection=connection, raise_404=True, use_dict=False)
        n_posts = user.posts.count()

    logger.info(f'Counted published posts of user with id number {id_user} successfully')
    return n_posts


def count_by_username(username: str, *, connection: DatabaseClient = None) -> int:
    """Count user published posts by username"""

    logger.info(f'Counting published posts of {username} user')
    with DatabaseClient(connection=connection) as connection:
        user = search_by_username(username, connection=connection, raise_404=True, use_dict=False)
        n_posts = user.posts.count()

    logger.info(f'Counted published posts of {username} user successfully')
    return n_posts
