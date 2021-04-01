from typing import Union

from loguru import logger

from ...database import Post
from ...database.client import DatabaseClient
from ...error.http import not_found
from ...modules.v1 import category, user


def count_by_id(id_user: int, *, connection: DatabaseClient = None) -> int:
    """Count user published posts by ID"""

    logger.info(f'Counting published posts of user with id number {id_user}')
    with DatabaseClient(connection=connection) as connection:
        searched_user = user.search_by_id(id_user, connection=connection, raise_404=True, use_dict=False)
        n_posts = searched_user.posts.count()

    logger.info(f'Counted published posts of user with id number {id_user} successfully')
    return n_posts


def count_by_username(username: str, *, connection: DatabaseClient = None) -> int:
    """Count user published posts by username"""

    logger.info(f'Counting published posts of @{username} user')
    with DatabaseClient(connection=connection) as connection:
        searched_user = user.search_by_username(username, connection=connection, raise_404=True, use_dict=False)
        n_posts = searched_user.posts.count()

    logger.info(f'Counted published posts of @{username} user successfully')
    return n_posts


def search(id_post: int, *, connection: DatabaseClient = None, raise_404: bool = True, use_dict: bool = True) -> Union[dict, Post]:
    """Search for post"""

    logger.info(f'Searching for post with id number {id_post}')
    with DatabaseClient(connection=connection) as connection:
        if not (post := Post.search(connection, id_post)) and raise_404:
            raise not_found.PostNotFoundException()

        if use_dict and post:
            post = post.to_dict()
        elif use_dict:
            post = {}

    logger.info(f'Searched for post with id number {id_post} successfully')
    return post


def list_(username: str, *, connection: DatabaseClient = None) -> list[dict]:
    """List all user post"""

    logger.info(f'Listing user posts with username @{username}')
    with DatabaseClient(connection=connection) as connection:
        searched_user = user.search_by_username(username, connection=connection, raise_404=True, use_dict=False)

        posts = searched_user.posts.all()
        posts = [post.to_dict(exclude=['THUMBNAIL']) for post in posts]

    logger.info(f'Listed user posts with username @{username} successfully')
    return posts


def thumbnail(id_post: int, *, connection: DatabaseClient = None) -> bytes:
    """Get post thumbnail"""

    logger.info(f'Getting post thumbnail with id number {id_post}')
    with DatabaseClient(connection=connection) as connection:
        searched_post = search(id_post, connection=connection, raise_404=True, use_dict=False)
        image = searched_post.THUMBNAIL

    logger.info(f'Getting post thumbnail with id number {id_post}')
    return image


def create(id_user: int, id_category: int, title: str, description: str, thumbnail: bytes, *, connection: DatabaseClient = None) -> dict:
    """Create new user post"""

    logger.info(f'Creating new user post with title {title!r}')
    with DatabaseClient(connection=connection) as connection:
        category.search(id_category, raise_404=True)
        user.search_by_id(id_user, raise_404=True)

        post = Post(ID_USER=id_user, ID_CATEGORY=id_category, TITLE=title, DESCRIPTION=description, THUMBNAIL=thumbnail)
        post.insert(connection)

        post = post.to_dict()

    logger.info(f'User post with title {title!r} was create successfully')
    return post
